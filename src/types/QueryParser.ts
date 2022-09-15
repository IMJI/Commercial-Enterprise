import Joi = require('joi');
import InvalidNumberException from '../exception/InvalidNumberException';
// import { convertToNumber } from '../services/utils/Utils';
import ValidationSchemes from '../services/utils/ValidationSchemes';
import { Sort } from './Sort';

interface Query {
	limit?: string;
	skip?: string;
	sort?: string | string[];
}

interface ParsedQuery {
	limit?: number;
	skip?: number;
	sort?: Sort[];
}

abstract class QueryParser {
	public static parse(query: Query): ParsedQuery {
		try {
			const parsedQuery: ParsedQuery = {};
			if (query.limit) {
				parsedQuery.limit = Joi.attempt(query.limit, ValidationSchemes.positiveInteger); //convertToNumber(query.limit, false);
			}
			if (query.skip) {
				parsedQuery.skip = Joi.attempt(query.skip, ValidationSchemes.positiveInteger);
			}
			if (query.sort) {
				parsedQuery.sort = Sort.fromString(typeof query.sort === 'string' ? [query.sort] : query.sort);
			}
			return parsedQuery;
		} catch (error) {
			throw new InvalidNumberException(error.message);
		}
	}
}

export { Query, ParsedQuery, QueryParser };
