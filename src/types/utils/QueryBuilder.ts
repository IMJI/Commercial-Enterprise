import { Repository, SelectQueryBuilder } from 'typeorm';
import FindOptions from '../dto/FindOptions';
import Join from './Join';
import { Sort } from './Sort';

abstract class QueryBuilder<T> {
	protected builder: SelectQueryBuilder<T>;
	protected name: string;
	private repository: Repository<T>;
	private sortableColumns: string[];
	private joins: Join[];

	constructor(
		name: string,
		repoitory: Repository<T>,
		sortableColumns: string[],
		joins: Join[] = []
	) {
		this.name = name;
		this.repository = repoitory;
		this.sortableColumns = sortableColumns;
		this.joins = joins;
	}

	public build(
		options: FindOptions,
		excludeDeleted = false
	): SelectQueryBuilder<T> {
		this.initializeBuilder();
		if (excludeDeleted) this.excludeDeleted();
		this.buildQueryBody(options);
		this.buildSortingOptions(options);
		this.buildSkipAndLimit(options);

		return this.builder;
	}

	private initializeBuilder(): void {
		this.builder = this.repository.createQueryBuilder(this.name);
		this.initializeJoins();
		this.builder = this.builder.where('1=1');
	}

	private initializeJoins(): void {
		for (const join of this.joins) {
			this.builder = this.builder.leftJoinAndSelect(
				`${this.name}.${join.column}`,
				join.relation
			);
		}
	}

	private excludeDeleted(): void {
		this.builder = this.builder.andWhere(`${this.name}.isDeleted = false`);
	}

	protected abstract buildQueryBody(options: FindOptions): void;

	// TODO: Change and refactor sorting. Remove multiple sort options feature
	private buildSortingOptions(options: FindOptions): void {
		const sortsArray = options.sort ? Sort.fromString(options.sort) : [];
		if (sortsArray && sortsArray.length > 0) {
			let isFirst = true;
			sortsArray.forEach((sort: Sort) => {
				const sortingColumn = this.sortableColumns.find(
					(s) => s === sort.column
				);
				if (sortingColumn) {
					if (isFirst) {
						this.builder = this.builder.orderBy(
							`${this.name}.${sortingColumn}`,
							sort.order
						);
						isFirst = false;
					} else
						this.builder = this.builder.addOrderBy(
							`${this.name}.${sortingColumn}`,
							sort.order
						);
				}
			});
		}
	}

	private buildSkipAndLimit(options: FindOptions): void {
		if (options.limit) this.builder = this.builder.take(options.limit);
		if (options.skip) this.builder = this.builder.skip(options.skip);
	}
}

export default QueryBuilder;
