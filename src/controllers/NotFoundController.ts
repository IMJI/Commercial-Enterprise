import { Request, Response } from 'express';
import Pages from '../services/Pages';

class NotFoundController {
	public static get(req: Request, res: Response): void {
		res.status(404).sendFile(Pages['notFound']);
	}
}

export default NotFoundController;
