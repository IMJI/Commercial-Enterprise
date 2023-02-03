import FindOptions from '../../types/dto/FindOptions';

class ManagerFindOptions extends FindOptions {
	percentFrom?: number;
	percentTo?: number;
	hireDateFrom?: string;
	hireDateTo?: string;
	parent?: number[];
}

export default ManagerFindOptions;
