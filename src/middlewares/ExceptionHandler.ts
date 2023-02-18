import * as express from 'express';
import Exception from '../exceptions/Exception';
import ServerIsBusyException from '../exceptions/ServerIsBusyException';
import Logger from '../logger/Logger';
import Pages from '../Pages';

class ExceptionHandler {
	public static mount(app: express.Application): express.Application {
		Logger.info('Booting exception handler middleware...');
		app.use('/', this.logError);
		app.use('/', this.errorResponder);
		return app;
	}

	private static logError(
		error: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const status = (error as Exception).statusCode;
		if (
			!(status >= 400 && status <= 499) &&
			!((error as Exception).name === 'ServerIsBusyException')
		)
			Logger.error(error);
		next(error);
	}

	private static errorResponder(
		error: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		let status = 500;
		const isApiPath = req.path.split('/')[1] === 'api';
		const isLoginPath = req.path.split('/')[1] === 'login';
		if (error instanceof Exception) status = (error as Exception).statusCode;
		if (status >= 400 && status <= 499) {
			if (isApiPath || isLoginPath) {
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
}

export default ExceptionHandler;
