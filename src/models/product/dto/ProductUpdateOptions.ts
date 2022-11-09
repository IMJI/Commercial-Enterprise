import UpdateOptions from '../../../types/dto/UpdateOptions';

class ProductUpdateOptions extends UpdateOptions {
	name?: string;
	category?: number;
	description?: string;
	isDeleted?: boolean;
}

export default ProductUpdateOptions;
