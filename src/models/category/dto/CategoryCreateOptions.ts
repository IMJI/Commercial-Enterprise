import CreateOptions from '../../../types/dto/CreateOptions';

class CategoryCreateOptions extends CreateOptions {
	name: string;
	isDeleted?: boolean;
}

export default CategoryCreateOptions;
