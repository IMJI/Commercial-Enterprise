import { toArray } from '../../utils/Utils';
import { Sort } from '../utils/Sort';
import QueryData from './QueryData';

class FindOptions {
	limit?: number;
	skip?: number;
	sort?: string; //Sort[];

	constructor(obj: QueryData) {
		this.limit = obj.limit;
		this.skip = obj.skip;
		this.sort = obj.sort;//obj.sort ? Sort.fromString(obj.sort) : [];
	}
}

export default FindOptions;
