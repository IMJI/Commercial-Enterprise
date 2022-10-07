import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../../../exception/NotFoundException';
import ValidationException from '../../../exception/ValidationException';
import TaxFindOptions from '../../../models/tax/dto/TaxFindOptions';
import IController from '../../../types/interfaces/IController';
import TaxReader from './TaxReader';

class TaxController implements IController {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (req.params.id) {
				const result = await TaxReader.readOne(+req.params.id);
				if (result) res.status(200).json(result);
				else
					throw new NotFoundException(
						`Can't find tax with id = ${req.params.id}`
					);
			} else {
				const findOptions = new TaxFindOptions(req.query);
				const rows = await TaxReader.read(findOptions);
				const count = await TaxReader.count(findOptions);
				if (rows && count > 0) res.status(200).json({ rows, count });
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
		return;
	}

	public async put(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		return;
	}

	public async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		return;
	}
}

export default new TaxController();
