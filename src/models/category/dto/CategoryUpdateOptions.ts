import UpdateOptions from '../../../types/dto/UpdateOptions';

class CategoryUpdateOptions extends UpdateOptions {
	name?: string;
	isDeleted?: boolean;
}

export default CategoryUpdateOptions;
