import * as express from 'express';
import * as cors from 'cors';
import Logger from '../logger/Logger';
import Config from '../Config';

class CorsMiddleware {
	public static mount(app: express.Application): express.Application {
		// if (Config.webServer.enableCORS) {
		// 	Logger.info('Booting CORS middleware...');
		// 	app.use(
		// 		cors({
		// 			origin: Config.webServer.url,
		// 			optionsSuccessStatus: 200
		// 		})
		// 	);
		// }
		app.use(cors());

		return app;
	}
}

export default CorsMiddleware;
