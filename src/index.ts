import * as dotenv from 'dotenv';
import App from './services/App';
import Config from './services/Config';
import Logger from './services/logger/Logger';

const PROD = 'production';
const DEV = 'development';

function Startup(): void {
	dotenv.config();
	if ([PROD, DEV].includes(process.env.NODE_ENV))
		Config.Initialize(process.env.NODE_ENV);
	else
		throw new Error(
			"Unknown NODE_ENV value. Use 'production' or 'development' values"
		);
	// process.env.UV_THREADPOOL_SIZE = String(Config.Database.uvThreadPoolSize);
	Logger.Initialize(Config.Logger);
	if (process.env.NODE_ENV === DEV)
		Logger.Warn('Application is running in DEVELOPMENT mode!');
	App.Startup();
}

async function Shutdown(): Promise<void> {
	await App.Shutdown().then(() => {
		Logger.Info('Exiting process...');
		Logger.Close();
		process.exit(0);
	});
}

process.on('SIGTERM', async () => {
	Logger.Info('Received SIGTERM');
	await Shutdown();
});

process.on('SIGINT', async () => {
	Logger.Info('Received SIGINT');
	await Shutdown();
});

process.on('uncaughtException', async (err: Error) => {
	Logger.Error('Uncaught exception');
	Logger.Fatal(err.name + ' ' + err.message);
	await Shutdown();
});

Startup();
