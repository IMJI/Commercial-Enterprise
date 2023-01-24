import FindOptions from '../../../types/dto/FindOptions';

class TaxFindOptions extends FindOptions {
	name?: string;
	valueFrom?: number;
	valueTo?: number;
}

export default TaxFindOptions;
