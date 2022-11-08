import Manager from '../../../../models/manager/Manager';
import ManagerQueryBuilder from '../../../../models/manager/utils/ManagerQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { ManagerFindOptions } from '../../../../models/manager/dto/ManagerFindOptions';

class ManagerReader implements IReader<Manager> {
	public async readOne(id: number): Promise<Manager> {
		const result = await Manager.findOneBy({ id });
		if (result && result.dismissalDate) return null;
		return result;
	}

	public async read(options: ManagerFindOptions): Promise<Manager[]> {
		const opts: ManagerFindOptions = { ...options };
		const query = ManagerQueryBuilder.build(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: ManagerFindOptions): Promise<number> {
		const opts: ManagerFindOptions = { ...options };
		const query = ManagerQueryBuilder.build(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: ManagerFindOptions
	): Promise<ReadAndCountResult<Manager>> {
		const opts: ManagerFindOptions = { ...options };
		const query = ManagerQueryBuilder.build(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new ManagerReader();
