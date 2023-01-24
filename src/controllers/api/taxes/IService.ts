import FindOptions from '../../../types/dto/FindOptions';
import ReadAndCountResult from '../../../types/dto/ReadAndCountResult';
import BaseDTO from './BaseDTO';
import DeleteResult from './DeleteResult';

interface IService {
	findOne<T>(id: number): Promise<T>;

	find<T>(options: FindOptions): Promise<T[]>;

	count<T>(options: FindOptions): Promise<number>;

	findAndCount<T>(options: FindOptions): Promise<ReadAndCountResult<T>>;

	create<T>(dto: BaseDTO): Promise<T>;

	update<T>(id: number, dto: BaseDTO): Promise<T>;

	delete<T>(id: number): Promise<DeleteResult>;
}

export default IService;
