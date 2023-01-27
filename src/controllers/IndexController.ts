import { Request, Response, NextFunction } from 'express';
import Pages from '../Pages';
import Controller from './Controller';

class IndexController extends Controller {
	public static get(req: Request, res: Response, next: NextFunction): void {
		res.sendFile(Pages['index']);
	}
}

export default IndexController;
