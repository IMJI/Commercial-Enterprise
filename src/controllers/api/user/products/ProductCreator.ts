import NotFoundException from '../../../../exceptions/NotFoundException';
import { Category } from '../../../../models/Models';
import ProductCreateOptions from '../../../../models/product/dto/ProductCreateOptions';
import Product from '../../../../models/product/Product';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';
import CategoryReader from '../categories/CategoryReader';

class ProductCreator implements ICreator<Product> {
	public async create(options: ProductCreateOptions): Promise<Product> {
		const { vendorCode, name, description } = options;
		const category: Category = await CategoryReader.readOne(options.category);
		if (!category)
			throw new NotFoundException(
				`Can't find category with id = ${options.category}`
			);

		const product = Product.create({
			vendorCode,
			name,
			description,
			category,
			isDeleted: false
		});
		await Product.save(product);

		return product;
	}
}

export default new ProductCreator();
