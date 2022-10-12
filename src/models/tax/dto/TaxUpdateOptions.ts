import UpdateOptions from '../../../types/dto/UpdateOptions';

class TaxUpdateOptions extends UpdateOptions {
	name?: string;
	value?: number;
	isDeleted?: boolean;
}

export default TaxUpdateOptions;
