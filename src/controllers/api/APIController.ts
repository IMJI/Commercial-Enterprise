import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../../exception/EntityCreationException';
import EntityDeletionException from '../../exception/EntityDeletionException';
import EntityIsNotSpecified from '../../exception/EntityIsNotSpecified';
import NotFoundException from '../../exception/NotFoundException';
import Controller from '../Controller';
import IService from '../../types/interfaces/IService';

class APIController<T> extends Controller<T> {
	constructor(name: string, service: IService<T>) {
		super(name, service);
	}

	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (req.params.id) {
				const result = await this.service.findOne(+req.params.id);
				if (result) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find ${this.name} with id = ${req.params.id}`
					);
			} else {
				/* const findOptions = new ProductFindOptions(req.query); */
				const findOptions = req.query;
				console.log(this);
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

	public async post(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await this.service.create(req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new ${this.name}`);
		} catch (error) {
			next(error);
		}
	}

	public async put(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id: number = +req.params.id;
			if (!id)
				throw new EntityIsNotSpecified(`Specify ${this.name} to be updated`);
			const result = await this.service.update(id, req.body);
			if (result) res.status(200).json(result);
			else
				throw new EntityCreationException(
					`Can't update ${this.name} by id: ${id}`
				);
		} catch (error) {
			next(error);
		}
	}

	public async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id: number = +req.params.id;
			if (!id)
				throw new EntityIsNotSpecified(`Specify ${this.name} to be deleted`);
			const result = await this.service.delete(id);
			if (result) res.status(200).json(result);
			else
				throw new EntityDeletionException(
					`Can't delete ${this.name} by id: ${id}`
				);
		} catch (error) {
			next(error);
		}
	}
}

export default APIController;
