import EntityCreationException from '../exceptions/EntityCreationException';
import NotFoundException from '../exceptions/NotFoundException';
import Product from '../models/product/Product';
import ProductDTO from '../models/product/ProductDTO';
import ProductFindOptions from '../models/product/ProductFindOptions';
import ProductMapper from '../models/product/ProductMapper';
import ProductQueryBuilder from '../models/product/ProductQueryBuilder';
import DeleteResult from '../types/dto/DeleteResult';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';
import CategoryService from './CategoryService';
import PriceService from './PriceService';
import StockService from './StockService';

class ProductService implements IService<Product> {
	public async findOne(id: number): Promise<Product> {
		const result = await Product.findOneBy({ vendorCode: id });
		if (result && result.isDeleted) return null;
		return result;
	}

	public async find(options: ProductFindOptions): Promise<Product[]> {
		const opts: ProductFindOptions = { ...options };
		const builder = new ProductQueryBuilder('product');
		const query = builder.build(opts);
		const result = await query.getMany();

		return result;
	}

	public async count(options: ProductFindOptions): Promise<number> {
		const opts: ProductFindOptions = { ...options };
		const builder = new ProductQueryBuilder('product');
		const query = builder.build(opts);
		const result = await query.getCount();

		return result;
	}

	public async findAndCount(
		options: ProductFindOptions
	): Promise<ReadAndCountResult<Product>> {
		const opts: ProductFindOptions = { ...options };
		const builder = new ProductQueryBuilder('product');
		const query = builder.build(opts);
		const rows = await query.getMany();
		const count = await query.getCount();

		return { rows, count };
	}

	public async create(dto: ProductDTO): Promise<Product> {
		const product = await ProductMapper.toDomain(dto);
		await Product.save(product);
		const price = PriceService.create({
			productId: product.vendorCode,
			dateFrom: new Date(),
			value: dto.price
		});
		if (!price)
			throw new EntityCreationException(`Can't create price for product`);
		const stock = StockService.create({ id: dto.vendorCode });
		if (!stock)
			throw new EntityCreationException(`Can't create stock for product`);

		return product;
	}

	public async update(dto: ProductDTO): Promise<Product> {
		const product = await Product.findOneBy({ vendorCode: dto.vendorCode });
		if (product && !product.isDeleted) {
			if (dto.name) product.name = dto.name;
			if (dto.description) product.description = dto.description;
			if (dto.category)
				product.category = await CategoryService.findOne(dto.category);
			await Product.save(product);

			return product;
		} else
			throw new NotFoundException(
				`Can't find product with vendor code = ${dto.vendorCode}`
			);
	}

	public async delete(id: number): Promise<DeleteResult> {
		const product = await Product.findOneBy({ vendorCode: id });
		if (product) {
			product.isDeleted = true;
			await Product.save(product);

			return {
				id,
				date: new Date(),
				success: product.isDeleted
			};
		} else
			throw new NotFoundException(
				`Can't find product with vendor code = ${id}`
			);
	}
}

export default new ProductService();
