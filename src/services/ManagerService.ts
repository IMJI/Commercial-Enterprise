import NotFoundException from '../exceptions/NotFoundException';
import Manager from '../models/manager/Manager';
import ManagerDTO from '../models/manager/ManagerDTO';
import ManagerFindOptions from '../models/manager/ManagerFindOptions';
import ManagerMapper from '../models/manager/ManagerMapper';
import ManagerQueryBuilder from '../models/manager/ManagerQueryBuilder';
import DeleteResult from '../types/dto/DeleteResult';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';

class ManagerService implements IService<Manager> {
	public async findOne(id: number): Promise<Manager> {
		const result = await Manager.findOneBy({ id });
		if (result && result.dismissalDate) return null;
		return result;
	}
	public async find(options: ManagerFindOptions): Promise<Manager[]> {
		const builder = new ManagerQueryBuilder('manager');
		const query = builder.build(options);
		const result = await query.getMany();

		return result;
	}
	public async count(options: ManagerFindOptions): Promise<number> {
		const builder = new ManagerQueryBuilder('manager');
		const query = builder.build(options);
		const result = await query.getCount();

		return result;
	}
	public async findAndCount(
		options: ManagerFindOptions
	): Promise<ReadAndCountResult<Manager>> {
		const builder = new ManagerQueryBuilder('manager');
		const query = builder.build(options);
		const rows = await query.getMany();
		const count = await query.getCount();

		return { rows, count };
	}
	public async create(dto: ManagerDTO): Promise<Manager> {
		const manager = await ManagerMapper.toDomain(dto);
		await Manager.save(manager);

		return manager;
	}
	public async update(dto: ManagerDTO): Promise<Manager> {
		const manager = await Manager.findOneBy({ id: dto.id });
		if (manager && !manager.dismissalDate) {
			if (dto.id) manager.id = dto.id;
			if (dto.percent) manager.percent = dto.percent;
			if (dto.hireDate) manager.hireDate = dto.hireDate;
			if (dto.dismissalDate) manager.dismissalDate = dto.dismissalDate;
			if (dto.parent) {
				const parent = await Manager.findOneBy({ id: dto.parent });
				if (parent && !parent.dismissalDate) {
					manager.parent = parent;
				}
			}
			await Manager.save(manager);

			return manager;
		} else
			throw new NotFoundException(`Can't find manager with id = ${dto.id}`);
	}
	public async delete(id: number): Promise<DeleteResult> {
		const manager = await Manager.findOneBy({ id });
		if (manager && !manager.dismissalDate) {
			manager.dismissalDate = new Date();
			await Manager.save(manager);

			return {
				id,
				date: manager.dismissalDate,
				success: true
			};
		} else throw new NotFoundException(`Can't find manager with id = ${id}`);
	}
}

export default new ManagerService();
