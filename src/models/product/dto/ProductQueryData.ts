import QueryData from '../../../types/dto/QueryData';

abstract class ProductQueryData extends QueryData {
	name?: string | string[];
	category?: string | string[];
	description?: string;
	isDeleted?: boolean;
}

export default ProductQueryData;
