import NotFoundException from '../../../../exceptions/NotFoundException';
import ManagerCreateOptions from '../../../../models/manager/dto/ManagerCreateOptions';
import Manager from '../../../../models/manager/Manager';
import { ICreator } from '../../../../types/interfaces/DatabaseAPI';
import ManagerReader from './ManagerReader';

class ManagerCreator implements ICreator<Manager> {
	public async create(options: ManagerCreateOptions): Promise<Manager> {
		const { firstName, lastName, patronymic, percent } = options;
		let parent = null;
		if (options.parent) {
			parent = await ManagerReader.readOne(options.parent);
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
			hireDate: new Date(Date.now()),
			parent: parent,
			dismissalDate: null
		});
		await Manager.save(manager);

		return manager;
	}
}

export default new ManagerCreator();
