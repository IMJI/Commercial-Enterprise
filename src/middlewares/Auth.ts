import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import AuthException from '../exceptions/AuthException';
import Payload from '../types/dto/Payload';
import * as jwt from 'jsonwebtoken';
import Config from '../Config';
import Roles from '../types/utils/Roles';

class Auth {
	private role: Roles;

	constructor(role = Roles.any) {
		this.role = role;
	}

	public auth(req: Request, res: Response, next: NextFunction) {
		const token = this.getToken(req);
		const payload = this.checkToken(token);
		if (this.role === Roles.any || this.role === payload.role) {
			req['user'] = {
				id: payload.id,
				role: payload.role
			};
		} else {
			throw new AuthException('You are not authorized');
		}

		next();
	}

	private getToken(req: Request): string {
		const authHeader = req.headers.authorization;
		if (authHeader) {
			const token = authHeader.split(' ')[1];
			return token;
		}
		throw new AuthException('Auth token is required');
	}

	private checkToken(token: string): Payload {
		try {
			const payload = <Payload>jwt.verify(token, Config.database.secretKey);
			return payload;
		} catch (error) {
			if (error.name === 'TokenExpiredError') {
				throw new AuthException('Token expired');
			}
			throw new AuthException('Authentification failed');
		}
	}
}

export default Auth;
