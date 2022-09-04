//import * as oracledb from 'oracledb';
import Config from './Config';
import Logger from './logger/Logger';
import { DataSource } from 'typeorm';
import { resolve } from 'path';
import Models from '../models/Models';

class Database {
	private static _dataSource: DataSource;
	public static get dataSource() {
		return this._dataSource;
	}

	public static async initialize(): Promise<number> {
		return new Promise((resolve, reject) => {
			Logger.info('Initializing database module');
			this._dataSource = new DataSource({
				type: Config.database.type,
				host: Config.database.host,
				port: Config.database.port,
				username: Config.database.username,
				password: Config.database.password,
				database: Config.database.database,
				synchronize: true,
				logging: false,
				entities: Models,
				subscribers: [],
				migrations: [],
				extra: {
					autoCommit: true
				}
			});

			this.dataSource
				.initialize()
				.then(() => {
					Logger.info(`Loaded ${Models.length} entities`);
					resolve(0);
				})
				.catch((error) => {
					Logger.error(error);
					reject(error);
				});
		});
	}

	// public static async Execute() : Promise<void> {

	// }

	public static async close(): Promise<number> {
		Logger.info('Closing database module');
		return new Promise((resolve, reject) => {
			this.dataSource
				.destroy()
				.then(() => {
					Logger.info('Database module closed');
					resolve(0);
				})
				.catch((error) => {
					Logger.error(error);
					reject(error);
				});
		});
	}
}

export default Database;
