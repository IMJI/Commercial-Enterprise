import { Request, Response, NextFunction } from 'express';
import { Params } from './ParamsParser';
import { Query } from './QueryParser';

interface IController<T> {
	get(req: Request<Params, unknown, unknown, Query>, res: Response, next: NextFunction): void;
	post(req: Request<Params, unknown, unknown, Query>, res: Response, next: NextFunction): void;
}

export default IController;
