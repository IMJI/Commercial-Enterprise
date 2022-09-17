import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../../../exception/NotFoundException';
import Outgoing from '../../../models/Outgoing';
import IController from '../../../types/IController';
import { Params, ParamsParser, ParsedParams } from '../../../types/ParamsParser';
import { OutgoingQuery, OutgoingQueryParser, ParsedOutgoingQuery } from '../../old_api/OutgoingQueryParser';
import OutgoingReadAPI from './OutgoingReadAPI';

class OutgoingsController implements IController<Outgoing> {
	public get(req: Request<Params, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): void {
		try {
			const parsedParams: ParsedParams = ParamsParser.parse(req.params);
			const parsedQuery: ParsedOutgoingQuery = OutgoingQueryParser.parse(req.query);
			OutgoingReadAPI.read(parsedQuery, parsedParams)
				.then((queryBuilder) => {
					let data: Promise<Outgoing> | Promise<Outgoing[]>;
					if (parsedParams.id) data = queryBuilder.getOne();
					else data = queryBuilder.getMany();
					data
						.then((data: Outgoing | Outgoing[]) => {
							if (data !== null && (data instanceof Outgoing || data.length > 0)) res.status(200).json(data);
							else throw new NotFoundException(`No data was found for your request ${req.url}`);
						})
						.catch((error) => {
							next(error);
						});
				})
				.catch((error) => {
					next(error);
				});
		} catch (error) {
			next(error);
		}
	}
}

export default new OutgoingsController();
