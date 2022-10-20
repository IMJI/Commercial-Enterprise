import QueryData from '../../../types/dto/QueryData';

abstract class CategoryQueryData extends QueryData {
	name?: string | string[];
	isDeleted?: boolean;
}

export default CategoryQueryData;
