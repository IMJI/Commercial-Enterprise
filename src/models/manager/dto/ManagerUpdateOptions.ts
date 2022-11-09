import UpdateOptions from '../../../types/dto/UpdateOptions';

class ManagerUpdateOptions extends UpdateOptions {
	firstName?: string;
	lastName?: string;
	patronymic?: string;
	percent?: number;
	hireDate?: Date;
	dismissalDate?: Date;
	parent?: number;
}

export default ManagerUpdateOptions;
