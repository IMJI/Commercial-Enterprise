import Database from '../../Database';
import QueryBuilder from '../../types/utils/QueryBuilder';
import { toArray } from '../../utils/Utils';
import Category from './Category';
import CategoryFindOptions from './CategoryFindOptions';

class CategoryQueryBuilder extends QueryBuilder<Category> {
	constructor(name: string) {
		const repoitory = Database.dataSource.getRepository(Category);
		const sortableColumns = ['name'];
		super(name, repoitory, sortableColumns);
	}

	protected buildQueryBody(options: CategoryFindOptions): void {
		if (options.name && options.name.length > 0)
			this.builder = this.builder.andWhere(`${this.name}.name IN (:...name)`, {
				name: toArray<string>(options.name)
			});
	}
}

export default CategoryQueryBuilder;
