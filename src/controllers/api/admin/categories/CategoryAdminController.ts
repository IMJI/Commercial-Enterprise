import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../../../../exception/EntityCreationException';
import EntityDeletionException from '../../../../exception/EntityDeletionException';
import EntityIsNotSpecified from '../../../../exception/EntityIsNotSpecified';
import NotFoundException from '../../../../exception/NotFoundException';
import { ExtendedCategoryFindOptions } from '../../../../models/category/dto/CategoryFindOptions';
import IController from '../../../../types/interfaces/IController';
import CategoryAdminCreator from './CategoryAdminCreator';
import CategoryAdminDeleter from './CategoryAdminDeleter';
import CategoryAdminReader from './CategoryAdminReader';
import CategoryAdminUpdater from './CategoryAdminUpdater';

class CategoryAdminController implements IController {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (req.params.id) {
				const result = await CategoryAdminReader.readOne(+req.params.id);
				if (result) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find category with id = ${req.params.id}`
					);
			} else {
				const findOptions = new ExtendedCategoryFindOptions(req.query);
				const result = await CategoryAdminReader.readAndCount(findOptions);
				if (result.rows && result.count > 0) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find category by query: ${req.path}`
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
			const result = await CategoryAdminCreator.create(req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new category`);
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
			if (!id) throw new EntityIsNotSpecified(`Specify entity to be updated`);
			const result = await CategoryAdminUpdater.update(id, req.body);
			if (result) res.status(200).json(result);
			else
				throw new EntityCreationException(`Can't update category by id: ${id}`);
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
			if (!id) throw new EntityIsNotSpecified(`Specify entity to be deleted`);
			const result = await CategoryAdminDeleter.delete(id);
			if (result) res.status(200).json(result);
			else
				throw new EntityDeletionException(`Can't delete category by id: ${id}`);
		} catch (error) {
			next(error);
		}
	}
}

export default new CategoryAdminController();
