import User from '../models/user/User';
import BaseDTO from '../types/dto/BaseDTO';
import DeleteResult from '../types/dto/DeleteResult';
import FindOptions from '../types/dto/FindOptions';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';

class UserService implements IService<User> {
	public async findOne(id: number): Promise<User> {
		const result = await User.findOneBy({ id });
		return result;
	}
	public async find(options: FindOptions): Promise<User[]> {
		throw new Error('Method not implemented.');
	}
	public async count(options: FindOptions): Promise<number> {
		throw new Error('Method not implemented.');
	}
	public async findAndCount(
		options: FindOptions
	): Promise<ReadAndCountResult<User>> {
		throw new Error('Method not implemented.');
	}
	public async create(dto: BaseDTO): Promise<User> {
		throw new Error('Method not implemented.');
	}
	public async update(id: number, dto: BaseDTO): Promise<User> {
		throw new Error('Method not implemented.');
	}
	public async delete(id: number): Promise<DeleteResult> {
		throw new Error('Method not implemented.');
	}
}

export default UserService;
