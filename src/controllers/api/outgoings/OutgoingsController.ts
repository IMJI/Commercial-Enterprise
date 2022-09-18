import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import { DataSource } from 'typeorm';
import NotFoundException from '../../../exception/NotFoundException';
import Outgoing from '../../../models/Outgoing';
import Database from '../../../services/Database';
import IController from '../../../types/IController';
import { Params, ParamsParser, ParsedParams } from '../../../types/ParamsParser';
import { outgoingBodyValidator } from '../../old_api/OutgoingBodyPareser';
import { OutgoingQuery, OutgoingQueryParser, ParsedOutgoingQuery } from '../../old_api/OutgoingQueryParser';
import OutgoingReadAPI from './OutgoingReadAPI';

class OutgoingsController implements IController<Outgoing> {
	public get(req: Request<Params, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): void {
		try {
			const dataSource = Database.dataSource;
			const parsedParams: ParsedParams = ParamsParser.parse(req.params);
			const parsedQuery: ParsedOutgoingQuery = OutgoingQueryParser.parse(req.query);
			OutgoingReadAPI.read(dataSource, parsedQuery, parsedParams)
				.then((data: Outgoing | Outgoing[]) => {
					if (data !== null && (data instanceof Outgoing || data.length > 0)) res.status(200).json(data);
					else throw new NotFoundException(`No data was found for your request ${req.url}`);
				})
				.catch((error) => {
					next(error);
				});
		} catch (error) {
			next(error);
		}
	}

	public post(req: Request<Params, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): void {
		try {
			const dataSource = Database.dataSource;
			const body = Joi.attempt(req.body, outgoingBodyValidator);
		} catch (error) {
			next(error);
		}
	}
}

export default new OutgoingsController();
