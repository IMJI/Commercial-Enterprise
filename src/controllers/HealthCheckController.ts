import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';

class HealthCheckController extends Controller {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.json({ health: true });
	}
}

export default HealthCheckController;
