import NotFoundException from '../../../../exception/NotFoundException';
import Manager from '../../../../models/manager/Manager';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';
import ManagerAdminReader from '../../admin/managers/ManagerAdminReader';

class ManagerAdminDeleter implements IDeleter<Manager> {
	public async delete(id: number): Promise<Manager> {
		const manager: Manager = await Manager.findOneBy({ id });
		const subs: Manager[] = await ManagerAdminReader.read({ parent: id });
		if (manager) {
			subs.forEach(async (sub) => {
				sub.parent = null;
				await Manager.save(sub);
			});
			await Manager.delete(id);

			return manager;
		} else throw new NotFoundException(`Can't find manager with id = ${id}`);
	}
}

export default new ManagerAdminDeleter();
