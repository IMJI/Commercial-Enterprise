import { Request, Response, NextFunction } from 'express';
import Pages from '../../services/Pages';

class LoginController {
	public static Get(req: Request, res: Response, next: NextFunction): void {
		res.sendFile(Pages['login']);
	}

	// public static Post(req : Request, res : Response, next : NextFunction) : void {

	// }
}

export default LoginController;
