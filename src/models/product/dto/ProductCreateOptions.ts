import CreateOptions from '../../../types/dto/CreateOptions';

class ProductCreateOptions extends CreateOptions {
	vendorCode: number;
	name: string;
	category: number;
	description?: string;
	isDeleted?: boolean;
}

export default ProductCreateOptions;
