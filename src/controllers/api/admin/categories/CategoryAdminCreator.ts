import CategoryCreateOptions from '../../../../models/category/dto/CategoryCreateOptions';
import Category from '../../../../models/category/Category';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';

class CategoryAdminCreator implements ICreator<Category> {
	public async create(options: CategoryCreateOptions): Promise<Category> {
		const { name } = options;
		let isDeleted = false;
		if (options.isDeleted !== undefined) isDeleted = options.isDeleted;
		const category = Category.create({
			name,
			isDeleted
		});
		await Category.save(category);

		return category;
	}
}

export default new CategoryAdminCreator();
