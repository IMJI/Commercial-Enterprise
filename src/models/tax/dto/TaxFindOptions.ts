import { toArray } from '../../../services/utils/Utils';
import FindOptions from '../../../types/dto/FindOptions';
import TaxQueryData from './TaxQueryData';

class TaxFindOptions extends FindOptions {
	name?: string[];
	valueFrom?: number;
	valueTo?: number;

	constructor(obj: TaxQueryData) {
		super(obj);
		this.name = obj.name ? toArray<string>(obj.name) : [];
		this.valueFrom = obj.valueFrom;
		this.valueTo = obj.valueTo;
	}
}

class ExtendedTaxFindOptions extends TaxFindOptions {
	isDeleted?: boolean;

	constructor(obj: TaxQueryData) {
		super(obj);
		this.isDeleted = obj.isDeleted;
	}
}

export { TaxFindOptions, ExtendedTaxFindOptions };
