import { toArray } from '../../../utils/Utils';
import FindOptions from '../../../types/dto/FindOptions';
import ManagerQueryData from './ManagerQueryData';

class ManagerFindOptions extends FindOptions {
	firstName?: string[];
	lastName?: string[];
	patronymic?: string[];
	percentFrom?: number;
	percentTo?: number;
	hireDateFrom?: Date;
	hireDateTo?: Date;
	parent?: number;

	constructor(obj: ManagerQueryData) {
		super(obj);
		this.firstName = obj.firstName ? toArray<string>(obj.firstName) : [];
		this.lastName = obj.lastName ? toArray<string>(obj.lastName) : [];
		this.patronymic = obj.patronymic ? toArray<string>(obj.patronymic) : [];
		this.percentFrom = obj.percentFrom;
		this.percentTo = obj.percentTo;
		this.hireDateFrom = obj.hireDateFrom;
		this.hireDateTo = obj.hireDateTo;
		this.parent = obj.parent;
	}
}

class ExtendedManagerFindOptions extends ManagerFindOptions {
	dismissalDateFrom?: Date;
	dismissalDateTo?: Date;

	constructor(obj: ManagerQueryData) {
		super(obj);
		this.dismissalDateFrom = obj.dismissalDateFrom;
		this.dismissalDateTo = obj.dismissalDateTo;
	}
}

export { ManagerFindOptions, ExtendedManagerFindOptions };
