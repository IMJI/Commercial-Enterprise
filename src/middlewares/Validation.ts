import * as express from 'express';
import Outgoing from '../models/Outgoing';
import Logger from '../services/logger/Logger';

class ValidationMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting validation middleware...');

		app.use('/api/outgoings', this.validateQuery<Outgoing>);

		return app;
	}

	public static validateQuery<T>(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		console.log(req.query);
		// const validatedRequest = new
		next();
	}
}

export default ValidationMiddleware;
