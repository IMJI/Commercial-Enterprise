import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../exceptions/NotFoundException';
import Controller from './Controller';

class NotFoundController extends Controller {
	public static get(req: Request, res: Response, next: NextFunction): void {
		throw new NotFoundException(`There are no API endpoint at ${req.path}`);
	}
}

export default NotFoundController;
