import { toArray } from '../../../utils/Utils';
import FindOptions from '../../../types/dto/FindOptions';
import CategoryQueryData from './CategoryQueryData';

class CategoryFindOptions extends FindOptions {
	name?: string[];

	constructor(obj: CategoryQueryData) {
		super(obj);
		this.name = obj.name ? toArray<string>(obj.name) : [];
	}
}

class ExtendedCategoryFindOptions extends CategoryFindOptions {
	isDeleted?: boolean;

	constructor(obj: CategoryQueryData) {
		super(obj);
		this.isDeleted = obj.isDeleted;
	}
}

export { CategoryFindOptions, ExtendedCategoryFindOptions };
