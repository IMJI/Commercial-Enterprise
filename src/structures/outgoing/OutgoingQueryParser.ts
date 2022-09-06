import { convertArrayToNumber, convertToNumber } from "../../services/utils/Utils";
import { Query,  ParsedQuery, QueryParser } from "../QueryParser";

interface OutgoingQuery extends Query {
	cost?: string;
	quantity?: string;
	vendorCode?: string | string[];
	manager?: string | string[];
	category?: string | string[];
	tax?: string | string[];
}

interface ParsedOutgoingQuery extends ParsedQuery {
    cost?: number; // Datatype for range
	quantity?: number; // Datatype for range
	vendorCode?: number[];
	manager?: number[];
	category?: string[];
	tax?: string[];
}


class OutgoingQueryParser extends QueryParser {
    public static override Parse(query: OutgoingQuery): ParsedOutgoingQuery {
        let parsedQuery: ParsedOutgoingQuery = super.Parse(query);
        if (query.category) {
            if (typeof query.category === 'string') parsedQuery.category = [query.category];
            else parsedQuery.category = query.category;
        }
        if (query.tax) {
            if (typeof query.tax === 'string') parsedQuery.tax = [query.tax];
            else parsedQuery.tax = query.tax;
        }
        if (query.manager) {
            if (typeof query.manager === 'string')
                parsedQuery.manager = [convertToNumber(query.manager)];
            else
                parsedQuery.manager = convertArrayToNumber(query.manager);
        }
        if (query.vendorCode) {
            if (typeof query.vendorCode === 'string')
                parsedQuery.vendorCode = [convertToNumber(query.vendorCode)];
            else
                parsedQuery.vendorCode = convertArrayToNumber(query.vendorCode);
        }
        
        return parsedQuery;
    }
}

export { OutgoingQuery, ParsedOutgoingQuery, OutgoingQueryParser }
