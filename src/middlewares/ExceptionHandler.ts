import * as express from 'express';
import Exception from '../exception/Exception';
import InvalidNumberException from '../exception/InvalidNumberException';
import Logger from '../services/logger/Logger';
import Pages from '../services/Pages';

class ExceptionHandler {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting exception handler middleware...');
		// app.use(function(err, req, res, next) {
		//     console.error(err.stack);
		//     res.status(500).send('Something broke!');
		// });
		app.use('/', this.logError);
		app.use('/', this.errorResponder);
		return app;
	}

	private static logError(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
		const status = (error as Exception).statusCode;
		if (status >= 500 && status <= 599) Logger.error(error);
		next(error);
	}

	private static errorResponder(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
		let status = 0;
		const isApiPath = req.path.split('/')[1] === 'api';
		if (error instanceof Exception) status = (error as Exception).statusCode;
		if (status >= 400 && status <= 499) {
			if (isApiPath) {
				res.status(status).json({
					name: error.name,
					message: error.message,
					status: status
				});
			} else {
				res.status(404).sendFile(Pages['notFound']);
			}
		} else {
			if (isApiPath) {
				res.status(status).json({
					name: 'Server Error',
					status: status
				});
			} else {
				// Send server error by html
			}
		}
	}
	//   const invalidPathHandler = (req, res, next) => {
	//     res.redirect('/error')
	//   }
}

export default ExceptionHandler;
