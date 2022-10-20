import NotFoundException from '../../../../exception/NotFoundException';
import CategoryUpdateOptions from '../../../../models/category/dto/CategoryUpdateOptions';
import Category from '../../../../models/category/Category';
import { IUpdater } from '../../../../types/interfaces/DatabaseAPI';

class CategoryAdminUpdater implements IUpdater<Category> {
	public async update(
		id: number,
		options: CategoryUpdateOptions
	): Promise<Category> {
		const category: Category = await Category.findOneBy({ id });
		if (category) {
			if (options.name) category.name = options.name;
			if (options.isDeleted !== undefined)
				category.isDeleted = options.isDeleted;
			await Category.save(category);

			return category;
		} else throw new NotFoundException(`Can't find category with id = ${id}`);
	}
}

export default new CategoryAdminUpdater();
