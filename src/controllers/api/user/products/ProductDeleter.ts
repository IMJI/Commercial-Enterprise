import NotFoundException from '../../../../exceptions/NotFoundException';
import Product from '../../../../models/product/Product';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class ProductDeleter implements IDeleter<Product> {
	public async delete(id: number): Promise<Product> {
		const product: Product = await Product.findOneBy({ vendorCode: id });
		if (product) {
			product.isDeleted = true;
			await Product.save(product);

			return product;
		} else throw new NotFoundException(`Can't find product with id = ${id}`);
	}
}

export default new ProductDeleter();
