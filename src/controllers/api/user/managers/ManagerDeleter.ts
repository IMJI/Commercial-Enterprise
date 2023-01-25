import NotFoundException from '../../../../exceptions/NotFoundException';
import Manager from '../../../../models/manager/Manager';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';
import ManagerReader from './ManagerReader';

class ManagerDeleter implements IDeleter<Manager> {
	public async delete(id: number): Promise<Manager> {
		const manager: Manager = await Manager.findOneBy({ id });
		const subs: Manager[] = await ManagerReader.read({ parent: id });
		if (manager) {
			manager.dismissalDate = new Date(Date.now());
			await Manager.save(manager);

			subs.forEach(async (sub) => {
				sub.parent = null;
				await Manager.save(sub);
			});

			return manager;
		} else throw new NotFoundException(`Can't find manager with id = ${id}`);
	}
}

export default new ManagerDeleter();
