import { Request, Response, NextFunction } from 'express';
import EntityCreationException from '../../../../exception/EntityCreationException';
import EntityDeletionException from '../../../../exception/EntityDeletionException';
import EntityIsNotSpecified from '../../../../exception/EntityIsNotSpecified';
import NotFoundException from '../../../../exception/NotFoundException';
import { ExtendedTaxFindOptions } from '../../../../models/tax/dto/TaxFindOptions';
import IController from '../../../../types/interfaces/IController';
import TaxAdminCreator from './TaxAdminCreator';
import TaxAdminDeleter from './TaxAdminDeleter';
import TaxAdminReader from './TaxAdminReader';
import TaxAdminUpdater from './TaxAdminUpdater';

class TaxAdminController implements IController {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (req.params.id) {
				const result = await TaxAdminReader.readOne(+req.params.id);
				if (result) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find tax with id = ${req.params.id}`
					);
			} else {
				const findOptions = new ExtendedTaxFindOptions(req.query);
				const result = await TaxAdminReader.readAndCount(findOptions);
				if (result.rows && result.count > 0) res.status(200).json(result);
				else
					throw new NotFoundException(`Can't find tax by query: ${req.path}`);
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
			const result = await TaxAdminCreator.create(req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't create new tax`);
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
			const result = await TaxAdminUpdater.update(id, req.body);
			if (result) res.status(200).json(result);
			else throw new EntityCreationException(`Can't update tax by id: ${id}`);
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
			const result = await TaxAdminDeleter.delete(id);
			if (result) res.status(200).json(result);
			else throw new EntityDeletionException(`Can't delete tax by id: ${id}`);
		} catch (error) {
			next(error);
		}
	}
}

export default new TaxAdminController();
