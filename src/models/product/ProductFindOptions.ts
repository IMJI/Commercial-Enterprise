import FindOptions from '../../types/dto/FindOptions';

class ProductFindOptions extends FindOptions {
	name?: string[];
	category?: string[];
	description?: string;
}

export default ProductFindOptions;
