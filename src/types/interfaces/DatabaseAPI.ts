import CreateOptions from '../dto/CreateOptions';
import FindOptions from '../dto/FindOptions';
import UpdateOptions from '../dto/UpdateOptions';

interface ICreator<T> {
	create(options: CreateOptions): Promise<T>;
}

interface IDeleter<T> {
	delete(id: number): Promise<T>;
}

interface IReader<T> {
	readOne(id: number): Promise<T>;
	read(options: FindOptions): Promise<T[]>;
	count(options: FindOptions): Promise<number>;
}

interface IUpdater<T> {
	update(id: number, options: UpdateOptions): Promise<T>;
}

export { ICreator, IDeleter, IReader, IUpdater };
