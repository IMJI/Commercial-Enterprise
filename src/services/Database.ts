import * as oracledb from 'oracledb';
import Config from './Config';
import Logger from './logger/Logger';
import { DataSource } from 'typeorm';
import { resolve } from 'path';
import Models from '../models/Models';

class Database {
    private static pool : oracledb.Pool;
    
    public static async OldInitialize() : Promise<void> {
        //this.pool = await oracledb.createPool(Config.Database.dbPool);
        if (this.pool) Logger.Info('Database initialized');
        else Logger.Fatal('Database initialization error: Cannot craete pool');
    }

    public static async OldExecute(statement : string, binds : oracledb.BindParameters = [], opts : oracledb.ExecuteOptions = {}) {
        return new Promise(async (resolve, reject) => {
            let connection : oracledb.Connection;
            opts.outFormat = oracledb.OUT_FORMAT_OBJECT;
            opts.autoCommit = true;
            try {
                connection = await this.OldConnect();
                let result : oracledb.Result<object> = await connection.execute(statement, binds, opts);
                resolve(result);
            } catch(error : any) {
                reject(error);
            } finally {
                if (connection) {
                    try { await connection.close(); }
                    catch(error : any) {
                        Logger.Error(error.message || error);
                    }
                }
            }
        });
    }

    public static async OldClose() : Promise<void> {
        await this.pool.close();
        Logger.Info('Database closed');
    }

    private static async OldConnect() : Promise<oracledb.Connection> {
        return await oracledb.getConnection();
    }

    private static dataSource : DataSource;

    public static async Initialize() : Promise<void> {
        this.dataSource = new DataSource({
            type: Config.Database.type,
            host: Config.Database.host,
            port: Config.Database.port,
            username: Config.Database.username,
            password: Config.Database.password,
            database: Config.Database.database,
            synchronize: false,
            logging: true,
            entities: Models,
            subscribers: [],
            migrations: [],
        });

        await this.dataSource.initialize().then(() => {
            Logger.Info('Database module started')
            resolve();
        }).catch((error) => Logger.Error(error))
    }

    public static async Execute() : Promise<void> {
        
    }

    public static async Close() : Promise<void> {
        await this.dataSource.destroy().then(() => {
            Logger.Info('Database module closed')
            resolve();
        }).catch((error) => Logger.Error(error))
    }
}

export default Database;