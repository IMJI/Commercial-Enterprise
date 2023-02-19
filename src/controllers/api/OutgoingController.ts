import { Request, Response, NextFunction } from "express";
import AuthException from "../../exceptions/AuthException";
import EntityCreationException from "../../exceptions/EntityCreationException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Manager } from "../../models/Models";
import OutgoingFindOptions from "../../models/outgoing/OutgoingFindOptions";
import OutgoingService from "../../services/OutgoingService";
import UserService from "../../services/UserService";
import Controller from "../Controller";

class OutgoingController extends Controller {
    private service = OutgoingService;

    public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const manager = await this.getManagerFromRequest(req);
			if (+req.params.id) {
				const result = await this.service.findOne(+req.params.id, manager.id);
				res.status(200).json(result);
			}
			else {
                const findOptions: OutgoingFindOptions = req.body;
                // findOptions.managers = [manager.id];
                const result = await this.service.findAndCount(findOptions, manager.id);
				if (result.rows && result.count > 0) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find ${this.name} by query: ${req.path}`
					);
            }
		} catch (error) {
			next(error);
		}
	}

	public async post(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const manager = await this.getManagerFromRequest(req);
			const result = await this.service.create(req.body, manager);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new ${this.name}`);
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

export default OutgoingController;