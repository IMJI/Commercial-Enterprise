import NotFoundException from '../../../../exception/NotFoundException';
import Category from '../../../../models/category/Category';
import ProductCreateOptions from '../../../../models/product/dto/ProductCreateOptions';
import Product from '../../../../models/product/Product';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';
import CategoryAdminReader from '../categories/CategoryAdminReader';

class ProductAdminCreator implements ICreator<Product> {
	public async create(options: ProductCreateOptions): Promise<Product> {
		const { vendorCode, name, description } = options;
		const category: Category = await CategoryAdminReader.readOne(
			options.category
		);
		if (!category)
			throw new NotFoundException(
				`Can't find category with id = ${options.category}`
			);
		let isDeleted = false;
		if (options.isDeleted !== undefined) isDeleted = options.isDeleted;
		const product = Product.create({
			vendorCode,
			name,
			description,
			category,
			isDeleted
		});
		await Product.save(product);

		return product;
	}
}

export default new ProductAdminCreator();
