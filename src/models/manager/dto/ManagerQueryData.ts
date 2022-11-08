import QueryData from '../../../types/dto/QueryData';

abstract class ManagerQueryData extends QueryData {
	firstName?: string | string[];
	lastName?: string | string[];
	patronymic?: string | string[];
	percentFrom?: number;
	percentTo?: number;
	hireDateFrom?: Date;
	hireDateTo?: Date;
	dismissalDateFrom?: Date;
	dismissalDateTo?: Date;
	parent?: number;
}

export default ManagerQueryData;
