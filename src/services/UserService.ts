import UserDTO from '../models/user/UserDTO';
import User from '../models/user/User';
import DeleteResult from '../types/dto/DeleteResult';
import FindOptions from '../types/dto/FindOptions';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';
import * as bcrypt from 'bcrypt';
import PasswordService from './PasswordService';
import UserMapper from '../models/user/UserMapper';
import { Manager } from '../models/Models';
import NotFoundException from '../exceptions/NotFoundException';

class UserService implements IService<User> {
	public async findOne(id: number): Promise<User> {
		const result = await User.findOne({
			where: { id },
			relations: ['manager', 'password']
		});
		return result;
	}

	public async findOneByEmail(email: string): Promise<User> {
		const result = await User.findOne({
			where: { email },
			relations: ['manager', 'password']
		});
		return result;
	}

	public async getManagerByUserId(id: number): Promise<Manager> {
		const user = await User.findOne({
			where: { id },
			relations: ['manager']
		});
		if (user && user.manager) return user.manager;
		throw new NotFoundException(`Can't get manager from user with id = ${id}`);
	}

	public async getUserByManagerId(id: number): Promise<User> {
		const user = await User.findOne({
			where: { manager: { id } },
			relations: ['manager']
		});

		return user;
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

	public async create(dto: UserDTO): Promise<User> {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(dto.password, salt);
		dto.password = hash;
		const password = await PasswordService.create({ hash });
		const user = await UserMapper.toDomain(dto);
		user.password = password;
		await User.save(user);

		return user;
	}

	public async update(dto: object): Promise<User> {
		throw new Error('Method not implemented.');
	}

	public async delete(id: number): Promise<DeleteResult> {
		throw new Error('Method not implemented.');
	}
}

export default new UserService();
