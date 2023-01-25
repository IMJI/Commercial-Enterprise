import * as express from 'express';
import * as morgan from 'morgan';
import Logger from '../logger/Logger';
import Config from '../Config';

class LogMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting HTTP log middleware...');

		app.use(
			morgan(Config.webServer.httpLogFormat, {
				stream: {
					write: (str: string) => {
						Logger.trace(str.replace('\n', ''));
					}
				}
			})
		);

		return app;
	}
}

export default LogMiddleware;
