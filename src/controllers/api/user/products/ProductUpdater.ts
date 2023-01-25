import NotFoundException from '../../../../exceptions/NotFoundException';
import { Category } from '../../../../models/Models';
import ProductUpdateOptions from '../../../../models/product/dto/ProductUpdateOptions';
import Product from '../../../../models/product/Product';
import { IUpdater } from '../../../../types/interfaces/DatabaseAPI';
import CategoryReader from '../categories/CategoryReader';

class ProductUpdater implements IUpdater<Product> {
	public async update(
		id: number,
		options: ProductUpdateOptions
	): Promise<Product> {
		const product: Product = await Product.findOneBy({ vendorCode: id });
		let category: Category = null;
		if (options.category)
			category = await CategoryReader.readOne(options.category);
		if (product) {
			if (options.name) product.name = options.name;
			if (options.description) product.description = options.description;
			if (category) product.category = category;
			await Product.save(product);

			return product;
		} else throw new NotFoundException(`Can't find product with id = ${id}`);
	}
}

export default new ProductUpdater();
