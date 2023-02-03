import Database from '../../Database';
import QueryBuilder from '../../types/utils/QueryBuilder';
import { toArray } from '../../utils/Utils';
import Manager from './Manager';
import ManagerFindOptions from './ManagerFindOptions';

class ManagerQueryBuilder extends QueryBuilder<Manager> {
	constructor(name: string) {
		const repoitory = Database.dataSource.getRepository(Manager);
		const sortableColumns = ['percent', 'hireDate'];
		super(name, repoitory, sortableColumns);
	}

	protected buildQueryBody(options: ManagerFindOptions): void {
		if (options.percentFrom)
			this.builder = this.builder.andWhere(
				`${this.name}.percent >= :percentFrom`,
				{
					percentFrom: options.percentFrom
				}
			);

		if (options.percentTo)
			this.builder = this.builder.andWhere(
				`${this.name}.percent <= :percentTo`,
				{
					percentTo: options.percentTo
				}
			);

		if (options.hireDateFrom)
			this.builder = this.builder.andWhere(
				`${this.name}.hireDate >= :hireDateFrom`,
				{
					hireDateFrom: options.hireDateFrom
				}
			);

		if (options.hireDateTo)
			this.builder = this.builder.andWhere(
				`${this.name}.hireDate <= :hireDateTo`,
				{
					hireDateTo: options.hireDateTo
				}
			);

		if (options.parent && options.parent.length > 0)
			this.builder = this.builder.andWhere(
				`${this.name}.parent.id IN (:...parent)`,
				{
					parent: toArray<number>(options.parent)
				}
			);
	}
}

export default ManagerQueryBuilder;
