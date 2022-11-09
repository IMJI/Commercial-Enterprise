import { SelectQueryBuilder } from 'typeorm';
import {
	ProductFindOptions,
	ExtendedProductFindOptions
} from '../dto/ProductFindOptions';
import Database from '../../../services/Database';
import BaseQueryBuilder from '../../../types/utils/BaseQueryBuilder';
import Product from '../Product';
import { productSortableColumns } from './ProductUtilities';

class ManagerQueryBuilder {
	public static build(
		options: ProductFindOptions
	): SelectQueryBuilder<Product> {
		let builder = Database.dataSource
			.getRepository(Product)
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.category', 'category')
			.where('product.isDeleted = false');

		if (options.name && options.name.length > 0)
			builder = builder.andWhere('product.name IN (:...name)', {
				name: options.name
			});

		if (options.category && options.category.length > 0)
			builder = builder.andWhere('category.name IN (:...category)', {
				category: options.category
			});

		if (options.description)
			builder = builder.andWhere("product.description like '%:description%'", {
				description: options.description
			});

		builder = BaseQueryBuilder.build<Product>(
			builder,
			productSortableColumns,
			options
		);

		return builder;
	}

	public static buildExtended(
		options: ExtendedProductFindOptions
	): SelectQueryBuilder<Product> {
		let builder = Database.dataSource
			.getRepository(Product)
			.createQueryBuilder('product')
			.leftJoinAndSelect('product.category', 'category')
			.where('1 = 1');

		if (options.name && options.name.length > 0)
			builder = builder.andWhere('product.name IN (:...name)', {
				name: options.name
			});

		if (options.category && options.category.length > 0)
			builder = builder.andWhere('category.name IN (:...category)', {
				category: options.category
			});

		if (options.description)
			builder = builder.andWhere("product.description like '%:description%'", {
				description: options.description
			});

		if (options.isDeleted !== undefined)
			builder = builder.andWhere('product.isDeleted = :isDeleted', {
				isDeleted: options.isDeleted
			});

		builder = BaseQueryBuilder.build<Product>(
			builder,
			productSortableColumns,
			options
		);

		return builder;
	}
}

export default ManagerQueryBuilder;
