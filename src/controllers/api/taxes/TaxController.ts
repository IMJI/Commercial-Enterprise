import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import NotFoundException from '../../../exception/NotFoundException';
import ValidationException from '../../../exception/ValidationException';
import TaxFindOptions from '../../../models/tax/dto/TaxFindOptions';
import TaxQueryData from '../../../models/tax/dto/TaxQueryData';
import Tax from '../../../models/tax/Tax';
import { taxQueryScheme } from '../../../models/tax/utils/TaxUtilities';
import Schemes from '../../../services/utils/Schemes';
import IController from '../../../types/interfaces/IController';
import TaxReader from './TaxReader';

class TaxController implements IController {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id = Joi.attempt(req.params.id, Schemes.id);
			if (id) {
				const result = await TaxReader.readOne(id);
				if (result) res.status(200).json(result);
				else throw new NotFoundException(`Can't find tax with id = ${id}`);
			} else {
				const validatedQuery: TaxQueryData = Joi.attempt(
					req.query,
					taxQueryScheme
				);
				const findOptions = new TaxFindOptions(validatedQuery);
				const rows = await TaxReader.read(findOptions);
				const count = await TaxReader.count(findOptions);
				console.log(rows + ' ' + count);
				if (rows && count > 0) res.status(200).json({ rows, count });
				else
					throw new NotFoundException(`Can't find tax by query: ${req.path}`);
			}
		} catch (error) {
			if (error.isJoi) {
				next(new ValidationException(error));
			}
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
