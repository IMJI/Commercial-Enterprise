import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../exceptions/EntityCreationException';
import NotFoundException from '../exceptions/NotFoundException';
import { User } from '../models/Models';
import ServiceController from './ServiceController';

class UserController extends ServiceController<User> {
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
		try {
			const result = await this.service.create(req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new user`)
		} catch (error) {
			next(error);
		}
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
