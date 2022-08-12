import * as oracledb from 'oracledb';
import Config from './Config';
import Logger from './logger/Logger';
import { DataSource } from 'typeorm';
import { resolve } from 'path';
import Models from '../models/Models';

class Database {
	private static dataSource: DataSource;

	public static async Initialize(): Promise<void> {
		this.dataSource = new DataSource({
			type: Config.Database.type,
			host: Config.Database.host,
			port: Config.Database.port,
			username: Config.Database.username,
			password: Config.Database.password,
			database: Config.Database.database,
			synchronize: true,
			logging: true,
			entities: Models,
			subscribers: [],
			migrations: [],
			extra: {
				autoCommit: true
			}
		});

		await this.dataSource
			.initialize()
			.then(async () => {
				Logger.Info('Database module started');
				resolve();
			})
			.catch((error) => Logger.Error(error));
	}

	// public static async Execute() : Promise<void> {

	// }

	public static async Close(): Promise<void> {
		await this.dataSource
			.destroy()
			.then(() => {
				Logger.Info('Database module closed');
				resolve();
			})
			.catch((error) => Logger.Error(error));
	}
}

export default Database;
