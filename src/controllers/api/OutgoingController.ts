import { Request, Response, NextFunction } from "express";
import AuthException from "../../exceptions/AuthException";
import NotFoundException from "../../exceptions/NotFoundException";
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
			const user = req['user'];
			const userId = user ? user['id'] : null;
            if (!userId) throw new AuthException('Invalid user id');
			if (+req.params.id) {
				const result = await this.service.findOne(+req.params.id, userId);
				res.status(200).json(result);
			}
			else {
                const manager = await UserService.getManagerByUserId(userId);
                const findOptions: OutgoingFindOptions = req.body;
                findOptions.managers = [manager.id];
                const result = await this.service.findAndCount(findOptions);
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
}

export default OutgoingController;