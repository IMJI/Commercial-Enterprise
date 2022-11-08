import NotFoundException from '../../../../exception/NotFoundException';
import ManagerCreateOptions from '../../../../models/manager/dto/ManagerCreateOptions';
import Manager from '../../../../models/manager/Manager';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';
import ManagerAdminReader from '../../admin/managers/ManagerAdminReader';

class ManagerAdminCreator implements ICreator<Manager> {
	public async create(options: ManagerCreateOptions): Promise<Manager> {
		const { firstName, lastName, patronymic, percent, dismissalDate } = options;
		const hireDate = options.hireDate || new Date(Date.now());
		let parent = null;
		if (options.parent) {
			parent = await ManagerAdminReader.readOne(options.parent);
			if (!parent)
				throw new NotFoundException(
					`Can't find parent manager with id = ${options.parent}`
				);
		}
		
		const manager = Manager.create({
			firstName,
			lastName,
			patronymic,
			percent,
			parent,
			hireDate,
			dismissalDate 
		});
		await Manager.save(manager);

		return manager;
	}
}

export default new ManagerAdminCreator();
