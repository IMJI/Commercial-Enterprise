import Joi = require('joi');
import { Request, Response, NextFunction } from 'express';
import { DataSource, QueryBuilder } from 'typeorm';
import Outgoing from '../../models/Outgoing';
import Database from '../../services/Database';
import Logger from '../../services/logger/Logger';
import { OutgoingQuery, OutgoingQueryParser, ParsedOutgoingQuery } from './OutgoingQueryParser';
import { Params, ParsedParams, ParamsParser } from '../../types/ParamsParser';
import { Sort } from '../../types/Sort';
import SortableColumn from '../../types/SortableColumns';
import { OutgoingBody, outgoingBodyValidator } from './OutgoingBodyPareser';
import Tax from '../../models/Tax';
import Manager from '../../models/Manager';
import Product from '../../models/Product';
import Price from '../../models/Price';

class OutgoingsController {
	private static readonly sortableColumns: SortableColumn[] = [
		{ name: 'category', column: 'category.name' },
		{ name: 'manager', column: 'manager.name' },
		{ name: 'product', column: 'product.name' },
		{ name: 'tax', column: 'tax.name' },
		{ name: 'cost', column: 'outgoing.cost' },
		{ name: 'quantity', column: 'outgoing.quantity' }
	];

	public static async get(req: Request<Params, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): Promise<void> {
		try {
			const parsedParams: ParsedParams = ParamsParser.parse(req.params);
			const parsedQuery: ParsedOutgoingQuery = OutgoingQueryParser.parse(req.query);
			const dataSource: DataSource = Database.dataSource;
			let queryBuilder = dataSource
				.getRepository(Outgoing)
				.createQueryBuilder('outgoing')
				.leftJoinAndSelect('outgoing.tax', 'tax')
				.leftJoinAndSelect('outgoing.manager', 'manager')
				.leftJoinAndSelect('outgoing.product', 'product')
				.leftJoinAndSelect('product.category', 'category')
				.where('1 = 1');

			if (parsedQuery.category) {
				queryBuilder = queryBuilder.andWhere('category.name IN (:...category)', { category: parsedQuery.category });
			}
			if (parsedQuery.vendorCode) {
				queryBuilder = queryBuilder.andWhere('product.vendorCode IN (:...vendorCode)', { vendorCode: parsedQuery.vendorCode });
			}
			if (parsedQuery.manager) {
				queryBuilder = queryBuilder.andWhere('outgoing.manager IN (:...manager)', { manager: parsedQuery.manager });
			}
			if (parsedQuery.tax) {
				queryBuilder = queryBuilder.andWhere('outgoing.tax IN (:...tax)', { tax: parsedQuery.tax });
			}
			if (parsedQuery.cost) {
				if (parsedQuery.cost.from) queryBuilder = queryBuilder.andWhere('outgoing.cost >= :costFrom', { costFrom: parsedQuery.cost.from });
				if (parsedQuery.cost.to) queryBuilder = queryBuilder.andWhere('outgoing.cost <= :costTo', { costTo: parsedQuery.cost.to });
			}
			if (parsedQuery.quantity) {
				if (parsedQuery.quantity.from)
					queryBuilder = queryBuilder.andWhere('outgoing.quantity >= :quantityFrom', { quantityFrom: parsedQuery.quantity.from });
				if (parsedQuery.quantity.to)
					queryBuilder = queryBuilder.andWhere('outgoing.quantity <= :quantityTo', { quantityTo: parsedQuery.quantity.to });
			}

			if (parsedParams.id) {
				queryBuilder = queryBuilder.andWhere('outgoing.id = :id', { id: parsedParams.id });
			}

			if (parsedQuery.sort) {
				let isFirst = true;
				parsedQuery.sort.forEach((sort: Sort) => {
					const sortingColumn = OutgoingsController.sortableColumns.find((s) => s.name === sort.column);
					if (sortingColumn) {
						if (isFirst) {
							queryBuilder = queryBuilder.orderBy(sortingColumn.column, sort.order);
							isFirst = false;
						} else queryBuilder = queryBuilder.addOrderBy(sortingColumn.column, sort.order);
					}
				});
			}

			if (parsedQuery.limit) {
				queryBuilder = queryBuilder.take(parsedQuery.limit);
			}

			if (parsedQuery.skip) {
				queryBuilder = queryBuilder.skip(parsedQuery.skip);
			}

			if (parsedParams.id) {
				queryBuilder
					.getOne()
					.then((data) => {
						if (data !== null) res.status(200).json(data);
						else res.status(404).end();
					})
					.catch((error) => {
						throw error;
					});
			} else {
				queryBuilder
					.getMany()
					.then((data) => {
						if (data !== null) res.status(200).json(data);
						else res.status(404).end();
					})
					.catch((error) => {
						throw error;
					});
			}
		} catch (error) {
			Logger.error(error);
			res.status(503).send('Server error');
			next(error);
		}
	}

	// REFACTOR
	public static async post(req: Request<unknown, unknown, OutgoingBody, unknown>, res: Response, next: NextFunction): Promise<void> {
		try {
			console.log(req.body);
			const dataSource: DataSource = Database.dataSource;
			const body = Joi.attempt(req.body, outgoingBodyValidator);
			const qbCost = dataSource
				.getRepository(Price)
				.createQueryBuilder('price')
				.leftJoinAndSelect('price.product', 'product')
				.where('product.vendorCode = :vendorCode', { vendorCode: body.product })
				.getOne()
				.then((data) => {
					const outgoing = {
						...body,
						cost: data.value * body.quantity
					};
					const queryBuilder = dataSource
						.createQueryBuilder()
						.insert()
						.into(Outgoing)
						.values(outgoing)
						.execute()
						.then(() => {
							res.status(201).json();
						});
				});
		} catch (error) {
			Logger.error(error);
			res.status(503).send('Server error');
			next(error);
		}
	}

	// public static async Put(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }

	// public static async Delete(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }
}

export default OutgoingsController;
export { OutgoingsController, OutgoingQuery };
