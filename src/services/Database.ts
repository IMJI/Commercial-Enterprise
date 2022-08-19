//import * as oracledb from 'oracledb';
import Config from './Config';
import Logger from './logger/Logger';
import { DataSource } from 'typeorm';
import { resolve } from 'path';
import Models from '../models/Models';

class Database {
	private static dataSource: DataSource;

	public static async Initialize(): Promise<number> {
		return new Promise((resolve, reject) => {
			Logger.Info('Initializing database module');
			this.dataSource = new DataSource({
				type: Config.Database.type,
				host: Config.Database.host,
				port: Config.Database.port,
				username: Config.Database.username,
				password: Config.Database.password,
				database: Config.Database.database,
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
					Logger.Info(`Loaded ${Models.length} entities`);
					resolve(0);
				})
				.catch((error) => {
					Logger.Error(error);
					reject(error);
				});
		});
	}

	// public static async Execute() : Promise<void> {

	// }

	public static async Close(): Promise<number> {
		Logger.Info('Closing database module');
		return new Promise((resolve, reject) => {
			this.dataSource
				.destroy()
				.then(() => {
					Logger.Info('Database module closed');
					resolve(0);
				})
				.catch((error) => {
					Logger.Error(error);
					reject(error);
				});
		});
	}
}

export default Database;
