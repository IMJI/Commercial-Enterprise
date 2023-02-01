import Database from '../../Database';
import QueryBuilder from '../../types/utils/QueryBuilder';
import { toArray } from '../../utils/Utils';
import Product from './Product';
import ProductFindOptions from './ProductFindOptions';

class ProductQueryBuilder extends QueryBuilder<Product> {
	constructor(name: string) {
		const repoitory = Database.dataSource.getRepository(Product);
		const sortableColumns = ['name', 'category'];
		super(name, repoitory, sortableColumns, ['category']);
	}

	protected buildQueryBody(options: ProductFindOptions): void {
		if (options.name && options.name.length > 0)
			this.builder = this.builder.andWhere('product.name IN (:...name)', {
				name: toArray<string>(options.name)
			});

		if (options.category && options.category.length > 0)
			this.builder = this.builder.andWhere('category.name IN (:...category)', {
				category: toArray<string>(options.category)
			});

		if (options.description)
			this.builder = this.builder.andWhere(
				"product.description like '%:description%'",
				{
					description: options.description
				}
			);
	}
}

export default ProductQueryBuilder;
