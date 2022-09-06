import { convertToNumber } from '../services/utils/Utils';
import { Sort } from './Sort';

interface Query {
	limit?: string;
	skip?: string;
	sort?: string;
}

interface ParsedQuery {
	limit?: number;
	skip?: number;
	sort?: Sort[];
}

abstract class QueryParser {
	public static parse(query: Query): ParsedQuery {
		const parsedQuery: ParsedQuery = {};
		if (query.limit) {
			parsedQuery.limit = convertToNumber(query.limit);
		}
		if (query.skip) {
			parsedQuery.skip = convertToNumber(query.skip);
		}
		if (query.sort) {
			parsedQuery.sort = Sort.fromString(query.sort);
		}
		return parsedQuery;
	}
}

export { Query, ParsedQuery, QueryParser };
