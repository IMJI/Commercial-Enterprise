import Manager from '../../../../models/manager/Manager';
import ManagerQueryBuilder from '../../../../models/manager/utils/ManagerQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { ExtendedManagerFindOptions } from '../../../../models/manager/dto/ManagerFindOptions';

class ManagerAdminReader implements IReader<Manager> {
	public async readOne(id: number): Promise<Manager> {
		const result = await Manager.findOneBy({ id });
		return result;
	}

	public async read(options: ExtendedManagerFindOptions): Promise<Manager[]> {
		const opts: ExtendedManagerFindOptions = { ...options };
		const query = ManagerQueryBuilder.buildExtended(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: ExtendedManagerFindOptions): Promise<number> {
		const opts: ExtendedManagerFindOptions = { ...options };
		const query = ManagerQueryBuilder.buildExtended(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: ExtendedManagerFindOptions
	): Promise<ReadAndCountResult<Manager>> {
		const opts: ExtendedManagerFindOptions = { ...options };
		const query = ManagerQueryBuilder.buildExtended(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new ManagerAdminReader();
