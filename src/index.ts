import 'reflect-metadata';
import * as dotenv from 'dotenv';
import App from './services/App';
import Config from './services/Config';
import Logger from './logger/Logger';

const PROD = 'production';
const DEV = 'development';

function startup(): void {
	process.stdin.resume();
	dotenv.config();
	if ([PROD, DEV].includes(process.env.NODE_ENV))
		Config.initialize(process.env.NODE_ENV);
	else
		throw new Error(
			`Unknown NODE_ENV value. Use 'production' or 'development' values`
		);
	Logger.initialize(Config.logger);
	if (process.env.NODE_ENV === DEV)
		Logger.warn('Application is running in DEVELOPMENT mode!');
	Logger.startTimer('App Startup');
	App.startup()
		.then(() => {
			Logger.stopTimer('App Startup');
		})
		.catch(() => {
			Logger.fatal('Error while starting application');
			process.exit(1);
		});
}

async function shutdown(): Promise<void> {
	App.shutdown()
		.then(() => {
			Logger.info('Exiting process...');
			Logger.close();
			process.exit(0);
		})
		.catch((error) => {
			Logger.fatal(`Error while shutting down. ${error.message || error}`);
			process.exit(1);
		});
}

process.on('SIGTERM', () => {
	Logger.info('Received SIGTERM');
	shutdown();
});

process.on('SIGINT', () => {
	Logger.info('Received SIGINT');
	shutdown();
});

process.on('uncaughtException', (err: Error) => {
	Logger.error('Uncaught exception');
	Logger.fatal(err.name + ' ' + err.message);
	shutdown();
});

startup();
