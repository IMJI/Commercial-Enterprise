import * as express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as toobusy from 'toobusy-js';
import { reviveJSON } from '../services/utils/Utils';
import Logger from '../services/logger/Logger';
import Config from '../services/Config';

class HttpMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting HTTP middleware...');

		app.use(
			bodyParser.json({
				limit: Config.webServer.maxUploadLimit
			})
		);
		app.use(
			bodyParser.urlencoded({
				limit: Config.webServer.maxUploadLimit,
				parameterLimit: Config.webServer.maxParameterLimit,
				extended: false
			})
		);
		app.use(helmet());
		app.use(
			express.json({
				reviver: reviveJSON
			})
		);
		toobusy.maxLag(Config.webServer.maxLag);
		toobusy.interval(Config.webServer.lagCheckInterval);
		app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
			if (toobusy()) {
				res.status(503).send('Server is busy right now. Try again later.');
			} else {
				next();
			}
		});

		return app;
	}
}

export default HttpMiddleware;
