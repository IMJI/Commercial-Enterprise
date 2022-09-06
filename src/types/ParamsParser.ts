import { convertToNumber } from '../services/utils/Utils';

type Params = {
	id?: string;
};

type ParsedParams = {
	id?: number;
};

class ParamsParser {
	public static parse(params: Params): ParsedParams {
		const parsedParams: ParsedParams = {};
		if (params.id) {
			parsedParams.id = convertToNumber(params.id);
		}
		return parsedParams;
	}
}

export { Params, ParsedParams, ParamsParser };
