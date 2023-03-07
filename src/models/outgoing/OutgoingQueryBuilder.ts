import Database from '../../Database';
import QueryBuilder from '../../types/utils/QueryBuilder';
import { toArray } from '../../utils/Utils';
import Outgoing from './Outgoing';
import OutgoingFindOptions from './OutgoingFindOptions';

class OutgoingQueryBuilder extends QueryBuilder<Outgoing> {
	constructor(name: string) {
		const repoitory = Database.dataSource.getRepository(Outgoing);
		const sortableColumns = [
			'product',
			'tax',
			'manager',
			'quantity',
			'cost',
			'statuses',
			'date'
		];
		super(name, repoitory, sortableColumns, [
			{ column: 'product', relation: 'product' },
			{ column: 'tax', relation: 'tax' },
			{ column: 'manager', relation: 'manager' },
			{ column: 'statuses', relation: 'status' }
			// { column: 'product.category', relation: 'category' }
		]);
	}

	protected buildQueryBody(options: OutgoingFindOptions): void {
		if (options.products && options.products.length > 0)
			this.builder = this.builder.andWhere(
				`${this.name}.product.id IN (:...products)`,
				{
					products: toArray<number>(options.products)
				}
			);

		if (options.taxes && options.products.length > 0)
			this.builder = this.builder.andWhere(
				`${this.name}.tax.id IN (:...taxes)`,
				{
					taxes: toArray<number>(options.taxes)
				}
			);

		if (options.managers && options.managers.length > 0)
			this.builder = this.builder.andWhere(
				`${this.name}.manager.id IN (:...managers)`,
				{
					managers: toArray<number>(options.managers)
				}
			);

		if (options.quantityFrom)
			this.builder = this.builder.andWhere(
				`${this.name}.quantity >= :quantityFrom`,
				{
					quantityFrom: options.quantityFrom
				}
			);

		if (options.quantityTo)
			this.builder = this.builder.andWhere(
				`${this.name}.quantity <= :quantityTo`,
				{
					quantityTo: options.quantityTo
				}
			);

		if (options.costFrom)
			this.builder = this.builder.andWhere(`${this.name}.cost >= :costFrom`, {
				costFrom: options.costFrom
			});

		if (options.costTo)
			this.builder = this.builder.andWhere(`${this.name}.cost <= :costTo`, {
				costTo: options.costTo
			});

		if (options.statuses && options.statuses.length > 0)
			this.builder = this.builder.andWhere(
				`${this.name}.status.status IN (:...statuses)`,
				{
					statuses: toArray<string>(options.statuses)
				}
			);
	}
}

export default OutgoingQueryBuilder;
