import * as oracledb from 'oracledb';
import Config from './Config';
import Logger from './logger/Logger';

class Database {
    private static pool : oracledb.Pool;
    
    public static async Initialize() : Promise<void> {
        this.pool = await oracledb.createPool(Config.DB_POOL);
        if (this.pool) Logger.Info('Database initialized');
        else Logger.Fatal('Database initialization error: Cannot craete pool');
    }

    public static async Execute(statement : string, binds : oracledb.BindParameters = [], opts : oracledb.ExecuteOptions = {}) {
        return new Promise(async (resolve, reject) => {
            let connection : oracledb.Connection;
            opts.outFormat = oracledb.OUT_FORMAT_OBJECT;
            opts.autoCommit = true;
            try {
                connection = await this.Connect();
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

    public static async Close() : Promise<void> {
        await this.pool.close();
        Logger.Info('Database closed');
    }

    private static async Connect() : Promise<oracledb.Connection> {
        return await oracledb.getConnection();
    }
}

export default Database;