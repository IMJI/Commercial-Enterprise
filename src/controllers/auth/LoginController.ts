import { Request, Response, NextFunction } from 'express';
import Pages from '../../Pages';
import UserService from '../../services/UserService';
import Controller from '../Controller';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import AuthException from '../../exceptions/AuthException';
import Config from '../../Config';
import Payload from '../../types/dto/Payload';

class LoginController extends Controller {
	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.sendFile(Pages['login']);
	}

	public async post(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { email, password } = req.body;
		try {
			const user = await UserService.findOneByEmail(email);
			if (!user) throw new AuthException('Invalid email or password');
			const isPasswordMatches = await bcrypt.compare(
				password,
				user.password.hash
			);
			if (!isPasswordMatches)
				throw new AuthException('Invalid email or password');
			const payload = {
				id: user.id,
				role: user.role
			};
			const token = jwt.sign(payload, Config.database.secretKey, {
				expiresIn: '1h'
			});

			res.send({
				user: user,
				token: token
			});
		} catch (error) {
			next(error);
		}
	}
}

export default LoginController;
