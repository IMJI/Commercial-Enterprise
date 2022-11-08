import CreateOptions from '../../../types/dto/CreateOptions';

class ManagerCreateOptions extends CreateOptions {
	firstName: string;
	lastName: string;
	patronymic?: string;
	percent: number;
	hireDate?: Date;
	dismissalDate?: Date;
	parent?: number;
}

export default ManagerCreateOptions;
