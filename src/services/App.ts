import 'reflect-metadata';
import Database from './Database';
import WebServer from './WebServer';
import Logger from './logger/Logger';

class App {
	public async Startup(): Promise<void> {
		Logger.StartTimer('App Startup');
		Logger.Info('Starting application...');
		try {
			Logger.Info('Initializing database module');
			await Database.Initialize();
		} catch (err) {
			Logger.Fatal('Encountered error while loading database: ' + err.message);
			//process.exit(1);
			await this.Shutdown();
		}

		try {
			Logger.Info('Initializing web server module');
			await WebServer.Initialize();
		} catch (err) {
			Logger.Fatal(
				'Encountered error while loading web server: ' + err.message
			);
			//process.exit(1);
			await this.Shutdown();
		}
		Logger.StopTimer('App Startup');
	}

	public async Shutdown(error?: Error): Promise<void> {
		let err: Error = error;
		Logger.Info('Shutting down...');
		try {
			Logger.Info('Closing web server module');
			await WebServer.Close();
		} catch (e: any) {
			Logger.Error('Encountered error while closing web server: ' + e.message);
			err = err || e;
		}

		try {
			Logger.Info('Closing database module');
			await Database.Close();
		} catch (e: any) {
			Logger.Error('Encountered error while closing database: ' + e.message);
			err = err || e;
		}
		if (err) Logger.Fatal(err.message);
		// if (err) process.exit(1);
		// else process.exit(0);
	}
}

export default new App();
