import CategoryService from '../../services/CategoryService';
import Product from './Product';
import ProductDTO from './ProductDTO';

class ProductMapper {
	public static async toDomain(dto: ProductDTO): Promise<Product> {
		const product = new Product();
		if (dto.vendorCode) product.vendorCode = dto.vendorCode;
		if (dto.name) product.name = dto.name;
		if (dto.description) product.description = dto.description;
		if (dto.category)
			product.category = await CategoryService.findOne(dto.category);
		product.isDeleted = false;

		return product;
	}

	public static toDTO(domain: Product): ProductDTO {
		const dto = new ProductDTO();
		dto.vendorCode = domain.vendorCode;
		dto.name = domain.name;
		dto.description = domain.description;
		dto.category = domain.category.id;

		return dto;
	}
}

export default ProductMapper;
