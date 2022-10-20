import Category from '../../../../models/category/Category';
import CategoryQueryBuilder from '../../../../models/category/utils/CategoryQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { CategoryFindOptions } from '../../../../models/category/dto/CategoryFindOptions';

class CategoryReader implements IReader<Category> {
	public async readOne(id: number): Promise<Category> {
		const result = await Category.findOneBy({ id });
		if (result && result.isDeleted) return null;
		return result;
	}

	public async read(options: CategoryFindOptions): Promise<Category[]> {
		const opts: CategoryFindOptions = { ...options };
		const query = CategoryQueryBuilder.build(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: CategoryFindOptions): Promise<number> {
		const opts: CategoryFindOptions = { ...options };
		const query = CategoryQueryBuilder.build(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: CategoryFindOptions
	): Promise<ReadAndCountResult<Category>> {
		const opts: CategoryFindOptions = { ...options };
		const query = CategoryQueryBuilder.build(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new CategoryReader();
