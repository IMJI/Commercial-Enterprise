import NotFoundException from '../../../../exception/NotFoundException';
import Category from '../../../../models/category/Category';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class CategoryAdminDeleter implements IDeleter<Category> {
	public async delete(id: number): Promise<Category> {
		const category: Category = await Category.findOneBy({ id });
		if (category) {
			await Category.delete(id);

			return category;
		} else throw new NotFoundException(`Can't find category with id = ${id}`);
	}
}

export default new CategoryAdminDeleter();
