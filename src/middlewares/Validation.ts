import * as express from 'express';
import Logger from '../services/logger/Logger';

class ValidationMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting validation middleware...');

		app.use('/', this.validateParams);

		return app;
	}

	public static validateParams(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
		Logger.debug(req.params.id);
        next();
	}
}

export default ValidationMiddleware;
