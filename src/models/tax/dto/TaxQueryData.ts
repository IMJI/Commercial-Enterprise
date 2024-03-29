import QueryData from '../../../types/dto/QueryData';

abstract class TaxQueryData extends QueryData {
	name?: string | string[];
	valueFrom?: number;
	valueTo?: number;
	isDeleted?: boolean;
}

export default TaxQueryData;
