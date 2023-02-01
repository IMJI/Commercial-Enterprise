import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../exceptions/NotFoundException';
import UserService from '../services/UserService';
import ServiceController from './ServiceController';

class UserController extends ServiceController<UserService> {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (+req.params.id) {
				this.getById(+req.params.id, res);
			} else {
				this.getByFindOptions(req, res);
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
		res.status(405).send('Method not allowed');
	}

	private async getById(id: number, res: Response) {
		const result = await this.service.findOne(id);
		if (result) res.status(200).json(result);
		else throw new NotFoundException(`Can't find ${this.name} with id = ${id}`);
	}

	private async getByFindOptions(req: Request, res: Response) {
		const findOptions = req.query;
		const result = await this.service.findAndCount(findOptions);
		if (result.rows && result.count > 0) res.status(200).json(result);
		else
			throw new NotFoundException(
				`Can't find ${this.name} by query: ${req.path}`
			);
	}
}

export default UserController;
