import * as express from 'express';
import Joi = require('joi');
import ValidationException from '../exception/ValidationException';
import Schemes from '../services/utils/Schemes';

class ValidationMiddleware {
	public static validate(queryScheme: Joi.Schema, bodyScheme: Joi.Schema) {
		return function (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) {
			try {
				req.params.id = Joi.attempt(req.params.id, Schemes.id);
				req.query = Joi.attempt(req.query, queryScheme);
				req.body = Joi.attempt(req.body, bodyScheme);
				next();
			} catch (error) {
				next(new ValidationException(error));
			}
		};
	}
}

export default ValidationMiddleware;
