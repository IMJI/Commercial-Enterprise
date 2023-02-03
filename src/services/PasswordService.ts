import { UserPassword } from '../models/Models';
import PasswordDTO from '../models/user/PasswordDTO';
import DeleteResult from '../types/dto/DeleteResult';
import FindOptions from '../types/dto/FindOptions';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';

class PasswordService implements IService<UserPassword> {
	public async findOne(id: number): Promise<UserPassword> {
		const result = await UserPassword.findOneBy({ id });

		return result;
	}
	public async find(options: FindOptions): Promise<UserPassword[]> {
		throw new Error('Method not implemented.');
	}
	public async count(options: FindOptions): Promise<number> {
		throw new Error('Method not implemented.');
	}
	public async findAndCount(
		options: FindOptions
	): Promise<ReadAndCountResult<UserPassword>> {
		throw new Error('Method not implemented.');
	}
	public async create(dto: PasswordDTO): Promise<UserPassword> {
		const password = new UserPassword();
		if (dto.hash) {
			password.hash = dto.hash;
			await UserPassword.save(password);

			return password;
		} else {
			// TODO: Exception
			throw new Error(`Can't create password`);
		}
	}
	public async update(dto: PasswordDTO): Promise<UserPassword> {
		throw new Error('Method not implemented.');
	}
	public async delete(id: number): Promise<DeleteResult> {
		throw new Error('Method not implemented.');
	}
}

export default new PasswordService();
