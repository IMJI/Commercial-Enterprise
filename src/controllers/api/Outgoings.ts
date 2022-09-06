import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import Outgoing from '../../models/Outgoing';
import Database from '../../services/Database';
import Logger from '../../services/logger/Logger';
import { OutgoingQuery, OutgoingQueryParser, ParsedOutgoingQuery } from './OutgoingQueryParser';
import { Params, ParsedParams, ParamsParser } from '../../types/ParamsParser';

class OutgoingsController {
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

	// public static async Post(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }

	// public static async Put(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }

	// public static async Delete(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }
}

export default OutgoingsController;
export { OutgoingsController, OutgoingQuery };
