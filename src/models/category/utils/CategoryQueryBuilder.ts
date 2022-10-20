import { SelectQueryBuilder } from 'typeorm';
import {
	CategoryFindOptions,
	ExtendedCategoryFindOptions
} from '../../category/dto/CategoryFindOptions';
import Database from '../../../services/Database';
import BaseQueryBuilder from '../../../types/utils/BaseQueryBuilder';
import Category from '../Category';
import { categorySortableColumns } from './CategoryUtilities';

class CategoryQueryBuilder {
	public static build(
		options: CategoryFindOptions
	): SelectQueryBuilder<Category> {
		let builder = Database.dataSource
			.getRepository(Category)
			.createQueryBuilder('category')
			.where('category.isDeleted = false');

		if (options.name && options.name.length > 0)
			builder = builder.andWhere('category.name IN (:...name)', {
				name: options.name
			});
		builder = BaseQueryBuilder.build<Category>(
			builder,
			categorySortableColumns,
			options
		);

		return builder;
	}

	public static buildExtended(
		options: ExtendedCategoryFindOptions
	): SelectQueryBuilder<Category> {
		let builder = Database.dataSource
			.getRepository(Category)
			.createQueryBuilder('category')
			.where('1 = 1');

		if (options.name && options.name.length > 0)
			builder = builder.andWhere('category.name IN (:...name)', {
				name: options.name
			});
		if (options.isDeleted !== undefined)
			builder = builder.andWhere('category.isDeleted = :isDeleted', {
				isDeleted: options.isDeleted
			});
		builder = BaseQueryBuilder.build<Category>(
			builder,
			categorySortableColumns,
			options
		);

		return builder;
	}
}

export default CategoryQueryBuilder;
