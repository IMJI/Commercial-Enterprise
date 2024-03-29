import { Request, Response } from 'express';
import Pages from '../services/Pages';

class IndexController {
	public static get(req: Request, res: Response): void {
		res.sendFile(Pages['index']);
	}
}

export default IndexController;
