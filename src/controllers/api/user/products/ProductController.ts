import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../../../../exception/EntityCreationException';
import EntityDeletionException from '../../../../exception/EntityDeletionException';
import EntityIsNotSpecified from '../../../../exception/EntityIsNotSpecified';
import NotFoundException from '../../../../exception/NotFoundException';
import { ProductFindOptions } from '../../../../models/product/dto/ProductFindOptions';
import IController from '../../../../types/interfaces/IController';
import ProductCreator from './ProductCreator';
import ProductDeleter from './ProductDeleter';
import ProductReader from './ProductReader';
import ProductUpdater from './ProductUpdater';

class ProductController implements IController {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (req.params.id) {
				const result = await ProductReader.readOne(+req.params.id);
				if (result) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find product with id = ${req.params.id}`
					);
			} else {
				const findOptions = new ProductFindOptions(req.query);
				const result = await ProductReader.readAndCount(findOptions);
				if (result.rows && result.count > 0) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find product by query: ${req.path}`
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
			const result = await ProductCreator.create(req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new product`);
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
			if (!id) throw new EntityIsNotSpecified(`Specify product to be updated`);
			const result = await ProductUpdater.update(id, req.body);
			if (result) res.status(200).json(result);
			else
				throw new EntityCreationException(`Can't update product by id: ${id}`);
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
			if (!id) throw new EntityIsNotSpecified(`Specify product to be deleted`);
			const result = await ProductDeleter.delete(id);
			if (result) res.status(200).json(result);
			else
				throw new EntityDeletionException(`Can't delete product by id: ${id}`);
		} catch (error) {
			next(error);
		}
	}
}

export default new ProductController();
