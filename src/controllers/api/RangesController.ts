import { Request, Response, NextFunction } from 'express';
import AuthException from '../../exceptions/AuthException';
import EntityCreationException from '../../exceptions/EntityCreationException';
import EntityDeletionException from '../../exceptions/EntityDeletionException';
import EntityIsNotSpecified from '../../exceptions/EntityIsNotSpecifiedException';
import NotFoundException from '../../exceptions/NotFoundException';
import { Manager } from '../../models/Models';
import OutgoingFindOptions from '../../models/outgoing/OutgoingFindOptions';
import OutgoingService from '../../services/OutgoingService';
import UserService from '../../services/UserService';
import Controller from '../Controller';

class RangesController extends Controller {
	private service = OutgoingService;

	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const manager = await this.getManagerFromRequest(req);
            const column = req.params.column;
			if (column === 'cost' || column === 'quantity' || column === 'date') {
				const result = await this.service.getRange(column, manager);
				res.status(200).json(result);
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

export default RangesController;
