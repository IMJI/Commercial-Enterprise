import * as express from 'express';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';
import * as toobusy from 'toobusy-js';
import Config from './Config';
import WebRouter from '../routes/WebRouter';
import ApiRouter from '../routes/ApiRouter';
import Logger from './logger/Logger';
import HttpMiddleware from '../middlewares/Http';
import LogMiddleware from '../middlewares/Log';
import StaticMiddleware from '../middlewares/Static';
import CorsMiddleware from '../middlewares/Cors';
import StatusMonitorMiddleware from '../middlewares/StatusMonitor';
import ExceptionHandler from '../middlewares/ExceptionHandler';
import NotFoundException from '../exception/NotFoundException';
import NotFoundController from '../controllers/NotFoundController';

class WebServer {
	private static express: express.Application;
	private static server: https.Server;
	private static serverOptions: https.ServerOptions;

	public static async initialize(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			Logger.info('Initializing web server module');
			const port: number = Config.webServer.port;
			this.serverOptions = {
				key: fs.readFileSync(path.join(__dirname, '../../key.pem')),
				cert: fs.readFileSync(path.join(__dirname, '../../cert.pem'))
			};
			this.express = express();
			this.mountRoutes(ApiRouter);
			this.mountRoutes(WebRouter);
			this.mountMiddlewares();
			this.server = https
				.createServer(this.serverOptions, this.express)
				.listen(port, () => {
					Logger.info('Web Server is listening at ' + port);
					resolve();
				})
				.on('error', (error: Error) => {
					Logger.error(error.message);
					reject(error);
				});
		});
	}

	public static async close(): Promise<void> {
		Logger.info('Closing web server module');
		return new Promise((resolve, reject) => {
			toobusy.shutdown();
			this.server.close((err: Error) => {
				Logger.info('Web server closed');
				if (err) {
					Logger.error(err.message);
					reject(err);
					return;
				}
				resolve();
			});
		});
	}

	private static mountMiddlewares(): void {
		this.express = StaticMiddleware.mount(this.express);
		this.express = HttpMiddleware.mount(this.express);
		if (Config.webServer.enableCORS) this.express = CorsMiddleware.mount(this.express);
		if (Config.webServer.enableHTTPLog) this.express = LogMiddleware.mount(this.express);
		this.express = StatusMonitorMiddleware.mount(this.express);
		this.express.use('/', express.Router().get('*', NotFoundController.get));
		this.express = ExceptionHandler.mount(this.express);
	}

	private static mountRoutes(router: express.Router): void {
		this.express.use('/', router);
	}
}

export default WebServer;
