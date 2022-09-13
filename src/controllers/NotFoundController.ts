import { Request, Response } from 'express';
import NotFoundException from '../exception/NotFoundException';

class NotFoundController {
	public static get(req: Request, res: Response): void {
		throw new NotFoundException(`There are no API endpoint at ${req.path}`);
	}
}

export default NotFoundController;
