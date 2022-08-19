import * as express from 'express';
import * as path from 'path';
import Logger from '../services/logger/Logger';

class StaticMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting static middleware...');

		app.use('/public', express.static(path.join(__dirname + '/../../public')));

		return app;
	}
}

export default StaticMiddleware;
