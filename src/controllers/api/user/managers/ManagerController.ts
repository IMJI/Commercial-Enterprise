import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../../../../exceptions/EntityCreationException';
import EntityDeletionException from '../../../../exceptions/EntityDeletionException';
import EntityIsNotSpecified from '../../../../exceptions/EntityIsNotSpecified';
import NotFoundException from '../../../../exceptions/NotFoundException';
import { ManagerFindOptions } from '../../../../models/manager/dto/ManagerFindOptions';
import IController from '../../../../types/interfaces/IController';
import ManagerCreator from './ManagerCreator';
import ManagerDeleter from './ManagerDeleter';
import ManagerReader from './ManagerReader';
import ManagerUpdater from './ManagerUpdater';

class ManagerController implements IController {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (req.params.id) {
				const result = await ManagerReader.readOne(+req.params.id);
				if (result) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find manager with id = ${req.params.id}`
					);
			} else {
				const findOptions = new ManagerFindOptions(req.query);
				const result = await ManagerReader.readAndCount(findOptions);
				if (result.rows && result.count > 0) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find manager by query: ${req.path}`
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
			const result = await ManagerCreator.create(req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new manager`);
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
			if (!id) throw new EntityIsNotSpecified(`Specify manager to be updated`);
			const result = await ManagerUpdater.update(id, req.body);
			if (result) res.status(200).json(result);
			else
				throw new EntityCreationException(`Can't update manager by id: ${id}`);
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
			if (!id) throw new EntityIsNotSpecified(`Specify manager to be deleted`);
			const result = await ManagerDeleter.delete(id);
			if (result) res.status(200).json(result);
			else
				throw new EntityDeletionException(`Can't delete manager by id: ${id}`);
		} catch (error) {
			next(error);
		}
	}
}

export default new ManagerController();
