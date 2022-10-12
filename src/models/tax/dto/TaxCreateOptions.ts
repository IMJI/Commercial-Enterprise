import CreateOptions from '../../../types/dto/CreateOptions';

class TaxCreateOptions extends CreateOptions {
	name: string;
	value: number;
	isDeleted?: boolean;
}

export default TaxCreateOptions;
