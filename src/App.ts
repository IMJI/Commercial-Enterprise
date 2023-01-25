import Database from './Database';
import WebServer from './WebServer';
import Logger from './logger/Logger';

class App {
	private static isDatabaseInitialized = false;
	private static isWebServerInitialized = false;

	private static databaseStartup(): Promise<void> {
		return new Promise((resolve, reject) => {
			Database.initialize()
				.then(() => {
					Logger.info('Database module started');
					this.isDatabaseInitialized = true;
					resolve();
				})
				.catch((error) => {
					Logger.error(
						`Error while initializing database module. ${
							error.message || error
						}`
					);
					reject(error);
				});
		});
	}

	private static webServerStartup(): Promise<void> {
		return new Promise((resolve, reject) => {
			WebServer.initialize()
				.then(() => {
					Logger.info('Web server module started');
					this.isWebServerInitialized = true;
					resolve();
				})
				.catch((error) => {
					Logger.error(
						`Error while initializing web server module. ${
							error.message || error
						}`
					);
					reject(error);
				});
		});
	}

	public static async startup(): Promise<void[]> {
		Logger.info('Starting application...');
		return Promise.all([this.webServerStartup(), this.databaseStartup()]);
	}

	private static databaseShutdown(): Promise<void> {
		return new Promise((resolve, reject) => {
			Database.close()
				.then(() => {
					this.isDatabaseInitialized = false;
					resolve();
				})
				.catch((error) => {
					Logger.error(
						`Error while closing database. ${error.message || error}`
					);
					reject(error);
				});
		});
	}

	private static webServerShutdown(): Promise<void> {
		return new Promise((resolve, reject) => {
			WebServer.close()
				.then(() => {
					this.isWebServerInitialized = false;
					resolve();
				})
				.catch((error) => {
					Logger.error(
						`Error while closing web server. ${error.message || error}`
					);
					reject(error);
				});
		});
	}

	public static async shutdown(error?: Error): Promise<void[]> {
		Logger.info('Shutting down...');
		const shutdownList: Promise<void>[] = [];
		if (this.isDatabaseInitialized) shutdownList.push(this.databaseShutdown());
		if (this.isWebServerInitialized)
			shutdownList.push(this.webServerShutdown());
		return Promise.all(shutdownList);
	}
}

export default App;
