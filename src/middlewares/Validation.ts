import * as express from 'express';
import Joi = require('joi');
import ValidationException from '../exceptions/ValidationException';
import Schemes from '../utils/Schemes';

class ValidationMiddleware {
	public static validate(
		queryScheme: Joi.Schema,
		bodyScheme: Joi.Schema,
		strictBodyScheme?: Joi.Schema
	) {
		return function (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) {
			if (!strictBodyScheme) strictBodyScheme = bodyScheme;
			try {
				req.params.id = String(Joi.attempt(req.params.id, Schemes.id));
				req.query = Joi.attempt(req.query, queryScheme);
				if (req.method === 'POST')
					req.body = Joi.attempt(req.body, strictBodyScheme);
				else if (req.method === 'PUT')
					req.body = Joi.attempt(req.body, bodyScheme);
				next();
			} catch (error) {
				next(new ValidationException(error));
			}
		};
	}
}

export default ValidationMiddleware;
