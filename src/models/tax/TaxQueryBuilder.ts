import Tax from './Tax';
import Database from '../../Database';
import { toArray } from '../../utils/Utils';
import QueryBuilder from '../../types/utils/QueryBuilder';
import TaxFindOptions from './TaxFindOptions';

class TaxQueryBuilder extends QueryBuilder<Tax> {
	constructor(name: string) {
		const repoitory = Database.dataSource.getRepository(Tax);
		const sortableColumns = ['name', 'value'];
		super(name, repoitory, sortableColumns);
	}

	protected buildQueryBody(options: TaxFindOptions): void {
		this.builder = this.builder.andWhere(`${this.name}.isDeleted = false`);

		if (options.name && options.name.length > 0)
			this.builder = this.builder.andWhere(`${this.name}.name IN (:...name)`, {
				name: toArray<string>(options.name)
			});
		if (options.valueFrom)
			this.builder = this.builder.andWhere(`${this.name}.value >= :valueFrom`, {
				valueFrom: options.valueFrom
			});
		if (options.valueTo)
			this.builder = this.builder.andWhere(`${this.name}.value <= :valueTo`, {
				valueTo: options.valueTo
			});
	}
}

export default TaxQueryBuilder;
