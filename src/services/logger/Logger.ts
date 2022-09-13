import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import LogLevels from './LogLevels';
import { LoggerConfig } from '../Config';
import { DateObject } from '../utils/DateObject';
import { getCallerFile, prettyDate, Time } from '../utils/Utils';
import TimeRotations from './TimeRotations';
import TimeStamp from './TimeStamp';

type LogMessage = {
	level: LogLevels;
	message: string;
};

const colors: object = {
	info: chalk.blue,
	debug: chalk.cyan,
	trace: chalk.grey,
	warn: chalk.yellow,
	error: chalk.red,
	fatal: chalk.redBright
};

class Logger {
	private static dir: string;
	private static filePath: string;
	private static format: string;
	private static cacheSize: number;
	private static showSummary: boolean;
	private static rowsRotation: number;
	private static timeRotation: TimeRotations;
	private static hideFromConsole: LogLevels[];
	private static hideFromFile: LogLevels[];
	private static writeCombinedLog: boolean;
	private static writeSeparatedLog: boolean;
	private static separatedLogLevels: LogLevels[];

	private static cache: LogMessage[] = [];
	private static uptimeStart: number;
	private static messages = {
		info: 0,
		debug: 0,
		trace: 0,
		warn: 0,
		error: 0,
		fatal: 0
	};
	private static lastRotation: number;
	private static rowsCount = 0;
	private static perfTimeStamp: TimeStamp;
	private static timeStamps = [];
	private static separetedLogFilenames = [];

	public static isInitialized = false;

	public static initialize(config: LoggerConfig) {
		if (this.isInitialized) throw new Error('Logger has already been initialized');
		this.uptimeStart = Date.now();

		this.dir = config.dir;
		this.cacheSize = config.maxCacheSize;
		this.showSummary = config.showSummary;
		this.format = config.format;
		this.filePath = path.join(this.dir, `latest.log`);
		this.rowsRotation = config.rowsRotation;
		// this.timeRotation = config.timeRotation || 0;
		// this.hideFromConsole = config.hideFromConsole || [];
		// this.hideFromFile = config.hideFromFile || [];
		this.timeRotation = 0;
		this.hideFromConsole = [];
		this.hideFromFile = [];
		this.writeCombinedLog = config.writeCombinedLog;
		this.writeSeparatedLog = config.writeSeparatedLog;
		// this.separatedLogLevels = config.separatedLogLevels || [];
		this.separatedLogLevels = [];

		if (this.writeSeparatedLog) {
			for (const loglvl in LogLevels) {
				if (this.separatedLogLevels.find((l: string) => l === loglvl.toUpperCase())) this.separetedLogFilenames.push(loglvl);
			}
		}
		if (this.rowsRotation || this.timeRotation) this.lastRotation = Date.now();
		if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
		this.perfTimeStamp = new TimeStamp('LOGPERF');
		this.isInitialized = true;
	}

	private static checkRotation(): void {
		if (this.rowsRotation && this.rowsCount >= this.rowsRotation) {
			this.rotateFiles();
			this.rowsCount = 0;
		}
		if (this.timeRotation && this.timeRotationCheck()) {
			this.rotateFiles();
		}
	}

	private static timeRotationCheck(): boolean {
		if (this.timeRotation === TimeRotations.everyday) {
			return this.lastRotation + Time.day < Date.now();
		} else if (this.timeRotation === TimeRotations.everyhour) {
			return this.lastRotation + Time.hour < Date.now();
		}
		return false;
	}

	private static rotateFiles(): void {
		this.writeCache();
		const filename: string = new Date(this.lastRotation).toISOString().replace(/:/g, '-').split('.')[0];
		fs.copyFileSync(this.filePath, path.join(this.dir, `${filename}.log`));
		fs.truncateSync(this.filePath, 0);
		this.separetedLogFilenames.forEach((lfn) => {
			const lfnPath: string = path.join(this.dir, `latest-${lfn}.log`);
			fs.copyFileSync(lfnPath, path.join(this.dir, `${filename}-${lfn}.log`));
			fs.truncateSync(lfnPath, 0);
		});
		this.lastRotation = Date.now();
	}

	private static writeCache(): void {
		if (this.writeCombinedLog) fs.appendFileSync(this.filePath, this.cache.map((l) => `${l.message}\n`).join(''));
		if (this.writeSeparatedLog) {
			this.separetedLogFilenames.forEach((lfn: string) => {
				fs.appendFileSync(
					path.join(this.dir, `latest-${lfn}.log`),
					this.cache.map((l) => (lfn.toUpperCase() === l.level ? `${l.message}\n` : '')).join('')
				);
			});
		}
		this.cache = [];
	}

	private static summary(): string {
		return `Uptime: ${prettyDate(Date.now() - this.uptimeStart)}, Warnings: ${this.messages['WARN']}, Errors: ${this.messages['ERROR']}, Fatal: ${
			this.messages['FATAL']
		}`;
	}

	private static formatString(level: string, message: string): object {
		const date: DateObject = new DateObject();
		let fileOut = this.format
			.replace('$MESSAGE', message)
			.replace('$FILE', getCallerFile(4))
			.replace('$YYYY', String(date.fullYear))
			.replace('$MM', date.monthString)
			.replace('$DD', date.dayString)
			.replace('$HR', date.hoursString)
			.replace('$MIN', date.minutesString)
			.replace('$SEC', date.secondsString)
			.replace('$MS', date.millisecondsString);
		const perf = this.perfTimeStamp.stamp();
		const consoleOut = fileOut
			.replace('$LEVEL', chalk.bold(colors[level.toLowerCase()](`[${level}]`)))
			.replace('$PERF', chalk.greenBright(`+${prettyDate(perf)}`));
		fileOut = fileOut.replace('$LEVEL', `[${level}]`).replace('$PERF', `+${prettyDate(perf)}`);
		return { fileOut, consoleOut };
	}

	private static log(level: LogLevels, message: string): void {
		this.checkRotation();
		if (!this.isInitialized) throw new Error('Logger was not initialized.');
		const output: object = this.formatString(level, message);
		if (!this.hideFromConsole.find((loglvl) => loglvl === level)) console.log(output['consoleOut']);
		if (!this.hideFromFile.find((loglvl) => loglvl === level)) this.cache.push({ level: level, message: output['fileOut'] });
		this.messages[level]++;
		this.rowsCount++;
		if (this.cache.length >= this.cacheSize) {
			this.writeCache();
		}
	}

	public static info(message: string): void {
		this.log(LogLevels.info, message);
	}
	public static debug(message: string): void {
		this.log(LogLevels.debug, message);
	}
	public static trace(message: string): void {
		this.log(LogLevels.trace, message);
	}
	public static warn(message: string): void {
		this.log(LogLevels.warning, message);
	}
	public static error(err: Error): void;
	public static error(message: string): void;
	public static error(message: string | Error): void {
		if (typeof message === 'string') this.log(LogLevels.error, message);
		else {
			if (message.stack) this.log(LogLevels.error, message.stack);
			else this.log(LogLevels.error, `${message.name}: ${message.message}`);
		}
	}
	public static fatal(message: string): void {
		this.log(LogLevels.fatal, message);
	}

	public static close(): void {
		// this.debug('Logging finished!');
		if (this.showSummary) this.debug(this.summary());
		if (this.timeRotation || this.rowsRotation) this.rotateFiles();
		else this.writeCache();
		this.isInitialized = false;
	}

	public static startTimer(name: string): void {
		const ts: TimeStamp = new TimeStamp(name);
		this.timeStamps.push(ts);
		this.debug(`Timer ${name} started`);
	}

	public static stopTimer(name: string): void {
		const ts: TimeStamp = this.timeStamps.find((ts: TimeStamp) => ts.name === name);
		if (ts) {
			this.debug(`Timer ${name} finished at ${prettyDate(ts.stamp())}`);
			this.timeStamps.splice(this.timeStamps.indexOf(ts), 1);
		}
	}
}

export default Logger;

export { Logger, LogLevels, LoggerConfig, TimeRotations };
