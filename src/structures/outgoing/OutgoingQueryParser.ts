import { convertArrayToNumber, convertToNumber } from '../../services/utils/Utils';
import { Query, ParsedQuery, QueryParser } from '../QueryParser';
import NumberRange from '../NumberRange';

interface OutgoingQuery extends Query {
	cost?: string;
	quantity?: string;
	vendorCode?: string | string[];
	manager?: string | string[];
	category?: string | string[];
	tax?: string | string[];
}

interface ParsedOutgoingQuery extends ParsedQuery {
	cost?: NumberRange;
	quantity?: NumberRange;
	vendorCode?: number[];
	manager?: number[];
	category?: string[];
	tax?: string[];
}

class OutgoingQueryParser extends QueryParser {
	public static override parse(query: OutgoingQuery): ParsedOutgoingQuery {
		const parsedQuery: ParsedOutgoingQuery = super.parse(query);
		if (query.category) {
			if (typeof query.category === 'string') parsedQuery.category = [query.category];
			else parsedQuery.category = query.category;
		}
		if (query.tax) {
			if (typeof query.tax === 'string') parsedQuery.tax = [query.tax];
			else parsedQuery.tax = query.tax;
		}
		if (query.manager) {
			if (typeof query.manager === 'string') parsedQuery.manager = [convertToNumber(query.manager)];
			else parsedQuery.manager = convertArrayToNumber(query.manager);
		}
		if (query.vendorCode) {
			if (typeof query.vendorCode === 'string') parsedQuery.vendorCode = [convertToNumber(query.vendorCode)];
			else parsedQuery.vendorCode = convertArrayToNumber(query.vendorCode);
		}
		if (query.cost) {
			parsedQuery.cost = NumberRange.fromString(query.cost);
		}
		if (query.quantity) {
			parsedQuery.quantity = NumberRange.fromString(query.quantity);
		}

		return parsedQuery;
	}
}

export { OutgoingQuery, ParsedOutgoingQuery, OutgoingQueryParser };
