import Category from '../../../../models/category/Category';
import CategoryQueryBuilder from '../../../../models/category/utils/CategoryQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { ExtendedCategoryFindOptions } from '../../../../models/category/dto/CategoryFindOptions';

class CategoryAdminReader implements IReader<Category> {
	public async readOne(id: number): Promise<Category> {
		const result = await Category.findOneBy({ id });
		return result;
	}

	public async read(options: ExtendedCategoryFindOptions): Promise<Category[]> {
		const opts: ExtendedCategoryFindOptions = { ...options };
		const query = CategoryQueryBuilder.buildExtended(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: ExtendedCategoryFindOptions): Promise<number> {
		const opts: ExtendedCategoryFindOptions = { ...options };
		const query = CategoryQueryBuilder.buildExtended(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: ExtendedCategoryFindOptions
	): Promise<ReadAndCountResult<Category>> {
		const opts: ExtendedCategoryFindOptions = { ...options };
		const query = CategoryQueryBuilder.buildExtended(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new CategoryAdminReader();
