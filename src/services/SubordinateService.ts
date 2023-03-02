import Manager from '../models/manager/Manager';
import DeleteResult from '../types/dto/DeleteResult';
import FindOptions from '../types/dto/FindOptions';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';

class SubordinateService implements IService<Manager> {
	findOne(id: number): Promise<Manager> {
		throw new Error('Method not implemented.');
	}
	find(options: FindOptions): Promise<Manager[]> {
		throw new Error('Method not implemented.');
	}
	count(options: FindOptions): Promise<number> {
		throw new Error('Method not implemented.');
	}
	findAndCount(options: FindOptions): Promise<ReadAndCountResult<Manager>> {
		throw new Error('Method not implemented.');
	}
	create(dto: object): Promise<Manager> {
		throw new Error('Method not implemented.');
	}
	update(dto: object): Promise<Manager> {
		throw new Error('Method not implemented.');
	}
	delete(id: number): Promise<DeleteResult> {
		throw new Error('Method not implemented.');
	}
}
