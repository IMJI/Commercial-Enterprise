import { toArray } from '../../../services/utils/Utils';
import FindOptions from '../../../types/dto/FindOptions';
import ProductQueryData from './ProductQueryData';

class ProductFindOptions extends FindOptions {
	name?: string[];
	category?: string[];
	description?: string;

	constructor(obj: ProductQueryData) {
		super(obj);
		this.name = obj.name ? toArray<string>(obj.name) : [];
		this.category = obj.category ? toArray<string>(obj.category) : [];
		this.description = obj.description;
	}
}

class ExtendedProductFindOptions extends ProductFindOptions {
	isDeleted?: boolean;

	constructor(obj: ProductQueryData) {
		super(obj);
		this.isDeleted = obj.isDeleted;
	}
}

export { ProductFindOptions, ExtendedProductFindOptions };
