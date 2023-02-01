import Category from '../models/category/Category';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import DeleteResult from '../types/dto/DeleteResult';
import IService from '../types/interfaces/IService';
import NotFoundException from '../exceptions/NotFoundException';
import CategoryFindOptions from '../models/category/CategoryFindOptions';
import CategoryQueryBuilder from '../models/category/CategoryQueryBuilder';
import CategoryMapper from '../models/category/CategoryMapper';
import CategoryDTO from '../models/category/CategoryDTO';

class CategoryService implements IService<Category> {
	public async findOne(id: number): Promise<Category> {
		const result = await Category.findOneBy({ id });
		if (result && result.isDeleted) return null;
		return result;
	}

	public async find(options: CategoryFindOptions): Promise<Category[]> {
		const opts: CategoryFindOptions = { ...options };
		const builder = new CategoryQueryBuilder('category');
		const query = builder.build(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: CategoryFindOptions): Promise<number> {
		const opts: CategoryFindOptions = { ...options };
		const builder = new CategoryQueryBuilder('category');
		const query = builder.build(opts);
		const result = await query.getCount();
		return result;
	}

	public async findAndCount(
		options: CategoryFindOptions
	): Promise<ReadAndCountResult<Category>> {
		const opts: CategoryFindOptions = { ...options };
		const builder = new CategoryQueryBuilder('category');
		const query = builder.build(opts);

		const rows = await query.getMany();
		const count = await query.getCount();

		return { rows, count };
	}

	public async create(dto: CategoryDTO): Promise<Category> {
		const category = CategoryMapper.toDomain(dto);
		await Category.save(category);

		return category;
	}

	public async update(dto: CategoryDTO): Promise<Category> {
		const category = await Category.findOneBy({ id: dto.id });
		if (category && !category.isDeleted) {
			if (dto.name) category.name = dto.name;
			await Category.save(category);

			return category;
		} else
			throw new NotFoundException(`Can't find category with id = ${dto.id}`);
	}

	public async delete(id: number): Promise<DeleteResult> {
		const category: Category = await Category.findOneBy({ id });
		if (category) {
			category.isDeleted = true;
			await Category.save(category);

			return {
				id,
				date: new Date(),
				success: category.isDeleted
			};
		} else throw new NotFoundException(`Can't find category with id = ${id}`);
	}
}

export default new CategoryService();
