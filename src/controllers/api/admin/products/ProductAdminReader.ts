import Product from '../../../../models/product/Product';
import ProductQueryBuilder from '../../../../models/product/utils/ProductQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { ExtendedProductFindOptions } from '../../../../models/product/dto/ProductFindOptions';

class ProductAdminReader implements IReader<Product> {
	public async readOne(id: number): Promise<Product> {
		const result = await Product.createQueryBuilder('product')
			.leftJoinAndSelect('product.category', 'category')
			.andWhere('product.vendorCode = :vendorCode', { vendorCode: id })
			.select()
			.getOne();
		return result;
	}

	public async read(options: ExtendedProductFindOptions): Promise<Product[]> {
		const opts: ExtendedProductFindOptions = { ...options };
		const query = ProductQueryBuilder.buildExtended(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: ExtendedProductFindOptions): Promise<number> {
		const opts: ExtendedProductFindOptions = { ...options };
		const query = ProductQueryBuilder.buildExtended(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: ExtendedProductFindOptions
	): Promise<ReadAndCountResult<Product>> {
		const opts: ExtendedProductFindOptions = { ...options };
		const query = ProductQueryBuilder.buildExtended(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new ProductAdminReader();
