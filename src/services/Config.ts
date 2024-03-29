import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

type WebServerConfig = {
	port: number;
	enableHTTPLog: boolean;
	httpLogFormat: string;
	maxUploadLimit: string;
	maxParameterLimit: number;
	enableCORS: boolean;
	url: string;
	maxLag: number;
	lagCheckInterval: number;
};

// type DatabaseConfig = {
//     secretKey : string;
//     dbPool : DBPoolConfig;
//     defaultThreadPoolSize : number;
//     uvThreadPoolSize : number;
// }

// type DBPoolConfig = {
//     user : string;
//     password : string;
//     connectString : string;
//     poolMin : number;
//     poolMax : number;
//     poolIncrement : number;
// }

type DatabaseConfig = {
	type: 'oracle' | 'mysql';
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
	secretKey: string;
};

type LoggerConfig = {
	dir: string;
	maxCacheSize: number;
	format: string;
	showSummary: boolean;
	rowsRotation: number;
	writeCombinedLog: boolean;
	writeSeparatedLog: boolean;
};

type CacheConfig = {
	maxSize: number;
};

class Config {
	private static webServerConfig: WebServerConfig;
	static get webServer(): WebServerConfig {
		return this.webServerConfig;
	}
	private static databaseConfig: DatabaseConfig;
	static get database(): DatabaseConfig {
		return this.databaseConfig;
	}
	private static loggerConfig: LoggerConfig;
	static get logger(): LoggerConfig {
		return this.loggerConfig;
	}
	private static cacheConfig: CacheConfig;
	static get cache(): CacheConfig {
		return this.cacheConfig;
	}

	public static initialize(nodeEnv: string): void {
		let filePath: string;
		if (nodeEnv === 'production')
			filePath = path.join(__dirname + '../../../configs/config.prod.yml');
		else if (nodeEnv === 'development')
			filePath = path.join(__dirname + '../../../configs/config.dev.yml');
		else
			throw new Error(
				"Incorrect NODE_ENV value. Can't initialize config module."
			);
		const file = fs.readFileSync(filePath, 'utf8');
		this.initGlobalConfig(yaml.loadAll(file));
	}

	private static initGlobalConfig(data: object): void {
		const config: object = data[0];
		this.webServerConfig = this.initWebServerConfig(config['server']);
		this.loggerConfig = this.initLoggerConfig(config['logger']);
		this.databaseConfig = this.initDatabaseConfig(config['database']);
	}

	private static initWebServerConfig(config: object): WebServerConfig {
		const port: number = config['port'] || process.env.PORT;
		const url: string = config['url'] || `http://localhost:${port}`;
		return {
			port: port,
			enableHTTPLog: config['enable-http-log'] || false,
			httpLogFormat: config['http-log-format'] || 'tiny',
			maxUploadLimit: config['max-upload-limit'] || '10mb',
			maxParameterLimit: config['max-parameter-limit'] || 10,
			enableCORS: config['enable-cors'] || true,
			url: url,
			maxLag: config['max-lag'] || 70,
			lagCheckInterval: config['lag-check-interval'] || 1000
		};
	}

	private static initDatabaseConfig(config: object): DatabaseConfig {
		return {
			type: config['type'],
			host: config['host'],
			port: config['port'],
			username: config['username'],
			password: config['password'],
			database: config['database'],
			secretKey: config['secret-key']
		};
	}

	private static initLoggerConfig(config: object): LoggerConfig {
		return {
			dir: config['directory'] || './logs',
			maxCacheSize: config['max-cache-size'] || 0,
			showSummary: config['show-summary'] || false,
			format:
				config['format'] ||
				'$YYYY-$MM-$DD $HR:$MIN:$SEC:$MS $FILE $PERF $LEVEL $MESSAGE',
			rowsRotation: config['rows-rotation'] || 0,
			writeCombinedLog: config['write-combined-log'] || true,
			writeSeparatedLog: config['write-separated-log'] || false
		};
	}
}

export default Config;
export { Config, WebServerConfig, DatabaseConfig, LoggerConfig, CacheConfig };
