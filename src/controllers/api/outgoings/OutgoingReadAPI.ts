import { DataSource, SelectQueryBuilder } from 'typeorm';
import Outgoing from '../../../models/Outgoing';
import Database from '../../../services/Database';
import { IReadAPI } from '../../../types/DatabaseAPI';
import { ParsedParams } from '../../../types/ParamsParser';
import { ParsedQuery } from '../../../types/QueryParser';
import { Sort } from '../../../types/Sort';
import SortableColumn from '../../../types/SortableColumns';
import { ParsedOutgoingQuery } from '../../old_api/OutgoingQueryParser';

const sortableColumns: SortableColumn[] = [
	{ name: 'category', column: 'category.name' },
	{ name: 'manager', column: 'manager.name' },
	{ name: 'product', column: 'product.name' },
	{ name: 'tax', column: 'tax.name' },
	{ name: 'cost', column: 'outgoing.cost' },
	{ name: 'quantity', column: 'outgoing.quantity' }
];

class OutgoingCreateAPI implements IReadAPI<Outgoing> {
	public read(dataSource: DataSource, query: ParsedOutgoingQuery, params: ParsedParams): Promise<Outgoing | Outgoing[]> {
		return new Promise((resolve, reject) => {
			let queryBuilder = dataSource
				.getRepository(Outgoing)
				.createQueryBuilder('outgoing')
				.leftJoinAndSelect('outgoing.tax', 'tax')
				.leftJoinAndSelect('outgoing.manager', 'manager')
				.leftJoinAndSelect('outgoing.product', 'product')
				.leftJoinAndSelect('product.category', 'category')
				.leftJoinAndSelect('outgoing.statuses', 'statuses')
				.where('1 = 1');

			if (query.category) {
				queryBuilder = queryBuilder.andWhere('category.name IN (:...category)', { category: query.category });
			}
			if (query.vendorCode) {
				queryBuilder = queryBuilder.andWhere('product.vendorCode IN (:...vendorCode)', { vendorCode: query.vendorCode });
			}
			if (query.manager) {
				queryBuilder = queryBuilder.andWhere('outgoing.manager IN (:...manager)', { manager: query.manager });
			}
			if (query.tax) {
				queryBuilder = queryBuilder.andWhere('outgoing.tax IN (:...tax)', { tax: query.tax });
			}
			if (query.cost) {
				if (query.cost.from) queryBuilder = queryBuilder.andWhere('outgoing.cost >= :costFrom', { costFrom: query.cost.from });
				if (query.cost.to) queryBuilder = queryBuilder.andWhere('outgoing.cost <= :costTo', { costTo: query.cost.to });
			}
			if (query.quantity) {
				if (query.quantity.from) queryBuilder = queryBuilder.andWhere('outgoing.quantity >= :quantityFrom', { quantityFrom: query.quantity.from });
				if (query.quantity.to) queryBuilder = queryBuilder.andWhere('outgoing.quantity <= :quantityTo', { quantityTo: query.quantity.to });
			}

			if (params.id) {
				queryBuilder = queryBuilder.andWhere('outgoing.id = :id', { id: params.id });
			}

			if (query.sort) {
				let isFirst = true;
				query.sort.forEach((sort: Sort) => {
					const sortingColumn = sortableColumns.find((s) => s.name === sort.column);
					if (sortingColumn) {
						if (isFirst) {
							queryBuilder = queryBuilder.orderBy(sortingColumn.column, sort.order);
							isFirst = false;
						} else queryBuilder = queryBuilder.addOrderBy(sortingColumn.column, sort.order);
					}
				});
			}

			if (query.limit) {
				queryBuilder = queryBuilder.take(query.limit);
			}

			if (query.skip) {
				queryBuilder = queryBuilder.skip(query.skip);
			}

			try {
				let data: Promise<Outgoing> | Promise<Outgoing[]>;
				if (params.id) data = queryBuilder.getOne();
				else data = queryBuilder.getMany();
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default new OutgoingCreateAPI();
