import { BaseEntity } from 'typeorm';
import { Manager } from '../models/Models';
import DeleteResult from './dto/DeleteResult';
import FindOptions from './dto/FindOptions';
import ReadAndCountResult from './dto/ReadAndCountResult';
import Service from './Service';

abstract class ProtectedEntity extends BaseEntity {
	manager: Manager;
}

abstract class ProtectedService<T extends ProtectedEntity> extends Service<T> {
	constructor(name: string) {
		super(name);
	}
	public abstract findOne(id: number, manager: Manager): Promise<T>;
	public abstract find(options: FindOptions, manager: Manager): Promise<T[]>;
	public abstract count(
		options: FindOptions,
		manager: Manager
	): Promise<number>;
	public abstract findAndCount(
		options: FindOptions,
		manager: Manager
	): Promise<ReadAndCountResult<T>>;
	public abstract create(dto: object, manager: Manager): Promise<T>;
	public abstract updeate(dto: object, manager: Manager): Promise<T>;
	public abstract delete(id: number, manager: Manager): Promise<DeleteResult>;
	protected checkAccess(manager: Manager, entity: T): boolean {
		return manager.id === entity.manager.id;
	}
}

export default ProtectedService;
