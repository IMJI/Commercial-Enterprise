import FindOptions from '../dto/FindOptions';
import ReadAndCountResult from '../dto/ReadAndCountResult';
import BaseDTO from '../dto/BaseDTO';
import DeleteResult from '../dto/DeleteResult';

interface IService<T> {
	findOne(id: number): Promise<T>;

	find(options: FindOptions): Promise<T[]>;

	count(options: FindOptions): Promise<number>;

	findAndCount(options: FindOptions): Promise<ReadAndCountResult<T>>;

	create(dto: BaseDTO): Promise<T>;

	update(id: number, dto: BaseDTO): Promise<T>;

	delete(id: number): Promise<DeleteResult>;
}

export default IService;
