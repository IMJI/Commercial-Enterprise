import { convertToNumber } from "../services/utils/Utils";
import { Sort } from "./Sort";

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
    public static Parse(query: Query): ParsedQuery {
        let parsedQuery: ParsedQuery = {};
        if (query.limit) {
            let limit: number = convertToNumber(query.limit);
            parsedQuery.limit = limit;
        }
        if (query.skip) {
            parsedQuery.skip = convertToNumber(query.skip);
        }
        if (query.sort) {
            let sort: Sort[] = Sort.fromString(query.sort);
            parsedQuery.sort = sort
        }
        return parsedQuery;
    }
}

export { Query, ParsedQuery, QueryParser }