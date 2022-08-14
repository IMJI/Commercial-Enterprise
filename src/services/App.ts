import 'reflect-metadata';
import Database from './Database';
import WebServer from './WebServer';
import Logger from './logger/Logger';

class App {
	private static DatabaseStartup(): Promise<void> {
		return new Promise((resolve, reject) => {
			Database.Initialize()
				.then(() => {
					Logger.Info('Database module started');
					resolve();
				})
				.catch((error) => {
					Logger.Error(`Error while initializing database module. ${error.message || error}`);
					reject(error);
				});
		});
	}

	private static WebServerStartup(): Promise<void> {
		return new Promise((resolve, reject) => {
			WebServer.Initialize()
				.then(() => {
					Logger.Info('Web server module started');
					resolve();
				})
				.catch((error) => {
					Logger.Error(`Error while initializing web server module. ${error.message || error}`);
					reject(error);
				});
		});
	}

	public static async Startup(): Promise<void[]> {
		Logger.Info('Starting application...');
		return Promise.all([this.WebServerStartup(), this.DatabaseStartup()]);
		// return new Promise((resolve, reject) => {
		// 	// try {
		// 	// 	Logger.Info('Initializing database module');
		// 	// 	await Database.Initialize();
		// 	// } catch (err) {
		// 	// 	Logger.Fatal('Encountered error while loading database: ' + err.message);
		// 	// 	//process.exit(1);
		// 	// 	await this.Shutdown();
		// 	// }

		// 	WebServer.Initialize().catch((error) => {
		// 		Logger.Error(`Error while initializing web server module. ${error.message || error}`);
		// 		reject(error);
		// 	});
		// 	Logger.StopTimer('App Startup');
		// });

		// try {
		// 	Logger.Info('Initializing web server module');
		// 	await WebServer.Initialize();
		// } catch (err) {
		// 	Logger.Fatal('Encountered error while loading web server: ' + err.message);
		// 	//process.exit(1);
		// 	await this.Shutdown();
		// }
		// Logger.StopTimer('App Startup');
	}

	public static async Shutdown(error?: Error): Promise<void> {
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

export default App;
