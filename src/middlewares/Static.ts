import * as express from 'express';
import * as path from 'path';
import Logger from '../logger/Logger';

class StaticMiddleware {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting static middleware...');

		app.use(
			'/public',
			express.static(path.join(__dirname + '/../../resources'))
		);

		return app;
	}
}

export default StaticMiddleware;
