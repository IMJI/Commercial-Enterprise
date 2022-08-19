import * as express from 'express';
import * as cors from 'cors';
import Logger from '../services/logger/Logger';
import Config from '../services/Config';

class CorsMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting CORS middleware...');

		app.use(
			cors({
				origin: Config.webServer.url,
				optionsSuccessStatus: 200
			})
		);

		return app;
	}
}

export default CorsMiddleware;
