import { Request, Response, NextFunction } from 'express';
import AuthException from '../../exceptions/AuthException';
import Manager from '../../models/manager/Manager';
import ManagerService from '../../services/ManagerService';
import UserService from '../../services/UserService';
import Controller from '../Controller';

class SubordinatesController extends Controller {
	constructor(name: string) {
		super(name);
	}

	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			// TODO: Improve this
			const result = [];
			const manager = await this.getManagerFromRequest(req);
			const subs = await ManagerService.getSubordinates(manager);
			console.log(subs);
			subs.forEach(async (sub) => {
				const user = await UserService.getUserByManagerId(sub.id);
				console.log(user);
				result.push(user);
			});
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	private async getManagerFromRequest(req: Request): Promise<Manager> {
		const user = req['user'];
		const userId = user ? user['id'] : null;
		if (!userId) throw new AuthException('Invalid user id');
		const manager = await UserService.getManagerByUserId(userId);
		return manager;
	}
}

export default SubordinatesController;
