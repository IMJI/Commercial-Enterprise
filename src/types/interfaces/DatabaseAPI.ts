import FindOptions from '../dto/FindOptions';

interface ICreateAPI<T> {
	create(object: T): Promise<T>;
}

interface IReader<T> {
	read(options: FindOptions): Promise<T[]>;
}

export { ICreateAPI, IReader };
