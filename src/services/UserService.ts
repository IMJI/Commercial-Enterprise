import UserDTO from '../models/user/UserDTO';
import User from '../models/user/User';
import BaseDTO from '../types/dto/BaseDTO';
import DeleteResult from '../types/dto/DeleteResult';
import FindOptions from '../types/dto/FindOptions';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';
import * as bcrypt from 'bcrypt';
import NotFoundException from '../exceptions/NotFoundException';
import PasswordService from './PasswordService';
import UserMapper from '../models/user/UserMapper';

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
	public async create(dto: UserDTO): Promise<User> {
		// const { manager, role, password } = dto;
		// const managerObject = await ManagerReader.readOne(manager);
		// if (!managerObject) throw new NotFoundException(`Can't find manager with id = ${manager}`);
		// const salt = await bcrypt.genSalt(10);
		// const hash = await bcrypt.hash(password, salt);
		// const user = User.create({
		// 	manager: managerObject,
		//     role,
		//     password: hash
		// });
		// await User.save(user);

		// return user;

		// Get data from dto
		// Create Manager entity
		// Generate hash
		// Create UserPassword entity
		// Create User entity
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
