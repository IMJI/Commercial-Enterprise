import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../../exceptions/EntityCreationException';
import EntityDeletionException from '../../exceptions/EntityDeletionException';
import EntityIsNotSpecified from '../../exceptions/EntityIsNotSpecifiedException';
import NotFoundException from '../../exceptions/NotFoundException';
import ServiceController from '../ServiceController';
import IService from '../../types/interfaces/IService';
import Controller from '../Controller';
import Manager from '../../models/manager/Manager';
import AuthException from '../../exceptions/AuthException';
import UserService from '../../services/UserService';
import OutgoingService from '../../services/OutgoingService';
import ProfitService from '../../services/ProfitService';
import { isDate } from '../../utils/Utils';

class ProfitController extends Controller {
	constructor(name: string) {
		super(name);
	}

	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const manager = await this.getManagerFromRequest(req);
			const timestamp = req.params.timestamp;
			if (timestamp === 'latest') {
				const result = await ProfitService.findLatest(manager.id);
				if (result) res.status(200).json(result);
				throw new NotFoundException(
					`Can't find ${this.name} for parent entity with id = ${manager.id}`
				);
			} else if (isDate(timestamp)) {
				const date = new Date(timestamp);
				const result = await ProfitService.findActualOn(manager.id, date);
				if (result) res.status(200).json(result);
				throw new NotFoundException(
					`Can't find ${this.name} for parent entity with id = ${manager.id}`
				);
			} else if (!timestamp) {
				const result = await ProfitService.findAll(manager.id);
				if (result && result.length > 0) res.status(200).json(result);
				throw new NotFoundException(
					`Can't find ${this.name} for parent entity with id = ${manager.id}`
				);
			}
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

export default ProfitController;
