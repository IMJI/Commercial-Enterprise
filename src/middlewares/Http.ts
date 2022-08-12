import * as express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as toobusy from 'toobusy-js';
import { ReviveJSON } from '../services/utils/Utils';
import Logger from '../services/logger/Logger';
import Config from '../services/Config';

class HttpMiddleware {
	public static Mount(app: express.Application): express.Application {
		Logger.Info('Booting HTTP middleware...');

		app.use(
			bodyParser.json({
				limit: Config.WebServer.maxUploadLimit
			})
		);
		app.use(
			bodyParser.urlencoded({
				limit: Config.WebServer.maxUploadLimit,
				parameterLimit: Config.WebServer.maxParameterLimit,
				extended: false
			})
		);
		app.use(helmet());
		app.use(
			express.json({
				reviver: ReviveJSON
			})
		);
		toobusy.maxLag(Config.WebServer.maxLag);
		toobusy.interval(Config.WebServer.lagCheckInterval);
		app.use(
			(
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				if (toobusy()) {
					res.status(503).send('Server is busy right now. Try again later.');
				} else {
					next();
				}
			}
		);

		return app;
	}
}

export default HttpMiddleware;
