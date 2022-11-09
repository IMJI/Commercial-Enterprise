import NotFoundException from '../../../../exception/NotFoundException';
import Product from '../../../../models/product/Product';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class ProductAdminDeleter implements IDeleter<Product> {
	public async delete(id: number): Promise<Product> {
		const product: Product = await Product.findOneBy({ vendorCode: id });
		if (product) {
			await Product.delete(id);

			return product;
		} else throw new NotFoundException(`Can't find product with id = ${id}`);
	}
}

export default new ProductAdminDeleter();
