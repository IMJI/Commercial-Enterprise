import 'reflect-metadata';
import * as dotenv from 'dotenv';
import App from './services/App';
import Config from './services/Config';
import Logger from './services/logger/Logger';

const PROD = 'production';
const DEV = 'development';

function Startup(): void {
	process.stdin.resume();
	dotenv.config();
	if ([PROD, DEV].includes(process.env.NODE_ENV)) Config.Initialize(process.env.NODE_ENV);
	else throw new Error("Unknown NODE_ENV value. Use 'production' or 'development' values");
	Logger.Initialize(Config.Logger);
	if (process.env.NODE_ENV === DEV) Logger.Warn('Application is running in DEVELOPMENT mode!');
	Logger.StartTimer('App Startup');
	App.Startup()
		.then(() => {
			Logger.StopTimer('App Startup');
		})
		.catch(() => {
			Logger.Fatal('Error while starting application');
			process.exit(1);
		});
}

async function Shutdown(): Promise<void> {
	App.Shutdown()
		.then(() => {
			Logger.Info('Exiting process...');
			Logger.Close();
			process.exit(0);
		})
		.catch((error) => {
			Logger.Fatal(`Error while shutting down. ${error.message || error}`);
			process.exit(1);
		});
}

process.on('SIGTERM', () => {
	Logger.Info('Received SIGTERM');
	Shutdown();
});

process.on('SIGINT', () => {
	Logger.Info('Received SIGINT');
	Shutdown();
});

process.on('uncaughtException', (err: Error) => {
	Logger.Error('Uncaught exception');
	Logger.Fatal(err.name + ' ' + err.message);
	Shutdown();
});

Startup();
