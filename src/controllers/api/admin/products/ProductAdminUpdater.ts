import NotFoundException from '../../../../exception/NotFoundException';
import Category from '../../../../models/category/Category';
import ProductUpdateOptions from '../../../../models/product/dto/ProductUpdateOptions';
import Product from '../../../../models/product/Product';
import { IUpdater } from '../../../../types/interfaces/DatabaseAPI';
import CategoryAdminReader from '../../admin/categories/CategoryAdminReader';

class ProductAdminUpdater implements IUpdater<Product> {
	public async update(
		id: number,
		options: ProductUpdateOptions
	): Promise<Product> {
		const product: Product = await Product.findOneBy({ vendorCode: id });
		let category: Category = null;
		if (options.category)
			category = await CategoryAdminReader.readOne(options.category);
		if (product) {
			if (options.name) product.name = options.name;
			if (options.description) product.description = options.description;
			if (category) product.category = category;
			if (options.isDeleted !== undefined)
				product.isDeleted = options.isDeleted;
			await Product.save(product);

			return product;
		} else throw new NotFoundException(`Can't find product with id = ${id}`);
	}
}

export default new ProductAdminUpdater();
