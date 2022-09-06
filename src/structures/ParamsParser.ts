import { convertToNumber } from "../services/utils/Utils";

type Params = {
    id?: string;
}

type ParsedParams = {
    id?: number;
}

class ParamsParser {
    public static Parse(params: Params): ParsedParams {
        let parsedParams: ParsedParams = {};
        if (params.id) {
            parsedParams.id = convertToNumber(params.id);
        }
        return parsedParams;
    }
}

export { Params, ParsedParams, ParamsParser }