import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import NotFoundException from '../../../exception/NotFoundException';
import Outgoing from '../../../models/Outgoing';
import Database from '../../../services/Database';
import IController from '../../../types/IController';
import { Params, ParamsParser, ParsedParams } from '../../../types/ParamsParser';
import { outgoingBodyValidator } from '../../old_api/OutgoingBodyPareser';
import { OutgoingQuery, OutgoingQueryParser, ParsedOutgoingQuery } from '../../old_api/OutgoingQueryParser';
import OutgoingReadAPI from './OutgoingReadAPI';

class OutgoingsController implements IController<Outgoing> {
	public async get(req: Request<Params, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): Promise<void> {
		try {
			const parsedParams: ParsedParams = ParamsParser.parse(req.params);
			const parsedQuery: ParsedOutgoingQuery = OutgoingQueryParser.parse(req.query);
			let data: Outgoing | Outgoing[];
			if (parsedParams.id) {
				data = await OutgoingReadAPI.readOne(parsedParams.id);
				if (data !== null) res.status(200).json(data);
				else throw new NotFoundException(`Can't find outgoing with id = ${parsedParams.id}`);
			} else {
				data = await OutgoingReadAPI.read(parsedQuery);
				const count = await OutgoingReadAPI.count(parsedQuery);
				if (data !== null && data.length > 0) res.status(200).json({ data, count });
				else throw new NotFoundException(`No data was found for your request ${req.url}`);
			}
		} catch(error) {
			next(error);
		}
	}

	public post(req: Request<Params, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): void {
		try {
			const dataSource = Database.dataSource;
			const body = Joi.attempt(req.body, outgoingBodyValidator);
			// .then(() => {
			res.status(201).json();
			// });
		} catch (error) {
			next(error);
		}
	}
}

export default new OutgoingsController();
