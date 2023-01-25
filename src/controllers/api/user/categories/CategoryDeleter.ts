import NotFoundException from '../../../../exceptions/NotFoundException';
import Category from '../../../../models/category/Category';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class CategoryDeleter implements IDeleter<Category> {
	public async delete(id: number): Promise<Category> {
		const category: Category = await Category.findOneBy({ id });
		if (category) {
			category.isDeleted = true;
			await Category.save(category);

			return category;
		} else throw new NotFoundException(`Can't find category with id = ${id}`);
	}
}

export default new CategoryDeleter();
