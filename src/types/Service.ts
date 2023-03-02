import { BaseEntity } from 'typeorm';

abstract class Service<T extends BaseEntity> {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}
}

export default Service;
