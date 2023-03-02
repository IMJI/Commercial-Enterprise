import { BaseEntity } from 'typeorm';
import Service from '../types/Service';

abstract class TimestampService<T extends BaseEntity> extends Service<T> {
	constructor(name: string) {
		super(name);
	}
	public abstract findLatest(parentId: number): Promise<T>;
	public abstract findActualOn(parentId: number, date: Date): Promise<T>;
	public abstract findAll(parentId: number): Promise<T[]>;
	public abstract create(dto: object): Promise<T>;
	public abstract update(dto: object): Promise<T>;
	protected abstract closePrevious(parentId: number, date: Date): Promise<T>;
}

export default TimestampService;
