import Product from '../../../../models/product/Product';
import ProductQueryBuilder from '../../../../models/product/utils/ProductQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { ProductFindOptions } from '../../../../models/product/dto/ProductFindOptions';

class ProductReader implements IReader<Product> {
	public async readOne(id: number): Promise<Product> {
		const result = await Product.createQueryBuilder('product')
			.leftJoinAndSelect('product.category', 'category')
			.andWhere('product.vendorCode = :vendorCode', { vendorCode: id })
			.select()
			.getOne();
		if (result && result.isDeleted) return null;
		return result;
	}

	public async read(options: ProductFindOptions): Promise<Product[]> {
		const opts: ProductFindOptions = { ...options };
		const query = ProductQueryBuilder.build(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: ProductFindOptions): Promise<number> {
		const opts: ProductFindOptions = { ...options };
		const query = ProductQueryBuilder.build(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: ProductFindOptions
	): Promise<ReadAndCountResult<Product>> {
		const opts: ProductFindOptions = { ...options };
		const query = ProductQueryBuilder.build(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new ProductReader();
