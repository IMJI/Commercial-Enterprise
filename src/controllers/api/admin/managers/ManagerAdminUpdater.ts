import NotFoundException from '../../../../exception/NotFoundException';
import ManagerUpdateOptions from '../../../../models/manager/dto/ManagerUpdateOptions';
import Manager from '../../../../models/manager/Manager';
import { IUpdater } from '../../../../types/interfaces/DatabaseAPI';
import ManagerAdminReader from './ManagerAdminReader';

class ManagerAdminUpdater implements IUpdater<Manager> {
	public async update(
		id: number,
		options: ManagerUpdateOptions
	): Promise<Manager> {
		const manager: Manager = await Manager.findOneBy({ id });
		let parent: Manager = null;
		if (options.parent) parent = await ManagerAdminReader.readOne(options.parent);
		if (!parent)
			throw new NotFoundException(
				`Can't find parent manager with id = ${parent}`
			);
		if (manager) {
			if (options.firstName) manager.firstName = options.firstName;
			if (options.lastName) manager.lastName = options.lastName;
			if (options.patronymic) manager.patronymic = options.patronymic;
			if (options.percent) manager.percent = options.percent;
			if (options.hireDate) manager.hireDate = options.hireDate;
			if (options.dismissalDate) manager.dismissalDate = options.dismissalDate;
			if (parent) manager.parent = parent;
			await Manager.save(manager);

			return manager;
		} else throw new NotFoundException(`Can't find manager with id = ${id}`);
	}
}

export default new ManagerAdminUpdater();
