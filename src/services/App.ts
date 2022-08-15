import Database from './Database';
import WebServer from './WebServer';
import Logger from './logger/Logger';

class App {
	private static isDatabaseInitialized = false;
	private static isWebServerInitialized = false;

	private static DatabaseStartup(): Promise<void> {
		return new Promise((resolve, reject) => {
			Database.Initialize()
				.then(() => {
					Logger.Info('Database module started');
					this.isDatabaseInitialized = true;
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
					this.isWebServerInitialized = true;
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
	}

	private static DatabaseShutdown(): Promise<void> {
		return new Promise((resolve, reject) => {
			Database.Close()
				.then(() => {
					this.isDatabaseInitialized = false;
					resolve();
				})
				.catch((error) => {
					Logger.Error(`Error while closing database. ${error.message || error}`);
					reject(error);
				});
		});
	}

	private static WebServerShutdown(): Promise<void> {
		return new Promise((resolve, reject) => {
			WebServer.Close()
				.then(() => {
					this.isWebServerInitialized = false;
					resolve();
				})
				.catch((error) => {
					Logger.Error(`Error while closing web server. ${error.message || error}`);
					reject(error);
				});
		});
	}

	public static async Shutdown(error?: Error): Promise<void[]> {
		Logger.Info('Shutting down...');
		const shutdownList: Promise<void>[] = [];
		if (this.isDatabaseInitialized) shutdownList.push(this.DatabaseShutdown());
		if (this.isWebServerInitialized) shutdownList.push(this.WebServerShutdown());
		return Promise.all(shutdownList);
	}
}

export default App;
