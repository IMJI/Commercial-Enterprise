import IService from '../types/interfaces/IService';
import Controller from './Controller';

abstract class ServiceController<T> extends Controller {
	protected service: IService<T>;

	constructor(name: string, service: IService<T>) {
		super(name);
		this.service = service;
	}
}

export default ServiceController;
