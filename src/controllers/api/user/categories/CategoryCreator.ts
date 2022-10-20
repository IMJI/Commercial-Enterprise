import CategoryCreateOptions from '../../../../models/category/dto/CategoryCreateOptions';
import Category from '../../../../models/category/Category';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';

class CategoryCreator implements ICreator<Category> {
	public async create(options: CategoryCreateOptions): Promise<Category> {
		const { name } = options;
		const tax = Category.create({
			name,
			isDeleted: false
		});
		await Category.save(tax);

		return tax;
	}
}

export default new CategoryCreator();
