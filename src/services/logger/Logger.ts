import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import LogLevels from './LogLevels';
import { LoggerConfig } from '../Config';
import { DateObject } from '../utils/DateObject';
import { GetCallerFile, PrettyDate, Time } from '../utils/Utils'
import TimeRotations from './TimeRotations';
import TimeStamp from './TimeStamp';

type LogMessage = {
    level: LogLevels;
    message: string;
}

let colors : object = {
    INFO: chalk.blue,
    DEBUG: chalk.cyan,
    TRACE: chalk.grey,
    WARN: chalk.yellow,
    ERROR: chalk.red,
    FATAL: chalk.redBright
}

class Logger {
    private static dir : string;
    private static filePath : string;
    private static format : string;
    private static cacheSize : number;
    private static showSummary : boolean;
    private static rowsRotation : number;
    private static timeRotation : TimeRotations;
    private static hideFromConsole : LogLevels[];
    private static hideFromFile : LogLevels[];
    private static writeCombinedLog : boolean;
    private static writeSeparatedLog : boolean;
    private static separatedLogLevels : LogLevels[];

    private static cache : LogMessage[] = [];
    private static uptimeStart : number;
    private static messages = {
        'INFO': 0,
        'DEBUG': 0,
        'TRACE': 0,
        'WARN': 0,
        'ERROR': 0,
        'FATAL': 0
    };
    private static lastRotation : number;
    private static rowsCount : number = 0;
    private static perfTimeStamp : TimeStamp;
    private static timeStamps = [];
    private static separetedLogFilenames = [];

    public static IsInitialized : boolean = false;

    public static Initialize(config : LoggerConfig) {
        if (this.IsInitialized) throw new Error('Logger has already been initialized');
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
            for (let loglvl in LogLevels) {
                if (this.separatedLogLevels.find((l : string) => l === loglvl.toUpperCase())) this.separetedLogFilenames.push(loglvl);
            }
        }
        if (this.rowsRotation || this.timeRotation) this.lastRotation = Date.now();
        if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
        this.perfTimeStamp = new TimeStamp('LOGPERF');
        this.IsInitialized = true;
    }

    private static CheckRotation() : void {
        if (this.rowsRotation && this.rowsCount >= this.rowsRotation) {
            this.RotateFiles();
            this.rowsCount = 0;
        }
        if (this.timeRotation && this.TimeRotationCheck()) {
            this.RotateFiles();
        }
    }

    private static TimeRotationCheck() : boolean {
        if (this.timeRotation === TimeRotations.Everyday) {
            return this.lastRotation + Time.Day < Date.now();
        } else if (this.timeRotation === TimeRotations.Everyhour) {
            return this.lastRotation + Time.Hour < Date.now();
        }
        return false;
    }

    private static RotateFiles() : void {
        this.WriteCache();
        let filename : string = new Date(this.lastRotation).toISOString().replace(/:/g, '-').split('.')[0];
        fs.copyFileSync(this.filePath, path.join(this.dir, `${filename}.log`));
        fs.truncateSync(this.filePath, 0);
        this.separetedLogFilenames.forEach(lfn => {
            let lfnPath : string = path.join(this.dir, `latest-${lfn}.log`);
            fs.copyFileSync(lfnPath, path.join(this.dir, `${filename}-${lfn}.log`));
            fs.truncateSync(lfnPath, 0);
        });
        this.lastRotation = Date.now();
    }

    private static WriteCache() : void {
        if (this.writeCombinedLog) fs.appendFileSync(this.filePath, this.cache.map(l => `${l.message}\n`).join(''));
        if (this.writeSeparatedLog) {
            this.separetedLogFilenames.forEach((lfn : string) => {
                fs.appendFileSync(path.join(this.dir, `latest-${lfn}.log`), this.cache.map(l => lfn.toUpperCase() === l.level ? `${l.message}\n` : '').join(''));
            });
        }
        this.cache = [];
    }

    private static Summary() : string {
        return `Uptime: ${PrettyDate(Date.now() - this.uptimeStart)}, Warnings: ${this.messages['WARN']}, Errors: ${this.messages['ERROR']}, Fatal: ${this.messages['FATAL']}`;
    }

    private static FormatString(level : string, message : string) : object {
        let date : DateObject = new DateObject();
        let fileOut = this.format
            .replace('$MESSAGE', message)
            .replace('$FILE', GetCallerFile(4))
            .replace('$YYYY', String(date.FullYear))
            .replace('$MM', date.MonthString)
            .replace('$DD', date.DayString)
            .replace('$HR', date.HoursString)
            .replace('$MIN', date.MinutesString)
            .replace('$SEC', date.SecondsString)
            .replace('$MS', date.MillisecondsString);
        let perf = this.perfTimeStamp.Stamp();
        let consoleOut = fileOut
            .replace('$LEVEL', chalk.bold(colors[level](`[${level}]`)))
            .replace('$PERF', chalk.greenBright(`+${PrettyDate(perf)}`));
        fileOut = fileOut
            .replace('$LEVEL', `[${level}]`)
            .replace('$PERF', `+${PrettyDate(perf)}`);
        return { fileOut, consoleOut }
    }

    private static Log(level : LogLevels, message : string) : void {
        this.CheckRotation();
        if (!this.IsInitialized) throw new Error('Logger was not initialized.');
        let output : object = this.FormatString(level, message);
        if (!this.hideFromConsole.find(loglvl => loglvl === level)) console.log(output['consoleOut']);
        if (!this.hideFromFile.find(loglvl => loglvl === level)) this.cache.push({ level: level, message: output['fileOut'] });
        this.messages[level]++;
        this.rowsCount++;
        if (this.cache.length >= this.cacheSize) {
            this.WriteCache();
        }
    }

    public static Info(message : string) : void { this.Log(LogLevels.Info, message); }
    public static Debug(message : string) : void { this.Log(LogLevels.Debug, message); }
    public static Trace(message : string) : void { this.Log(LogLevels.Trace, message); }
    public static Warn(message : string) : void { this.Log(LogLevels.Warning, message); }
    public static Error(message : string) : void { this.Log(LogLevels.Error, message); }
    public static Fatal(message : string) : void { this.Log(LogLevels.Fatal, message); }

    public static Close() : void {
        this.Debug('Logging finished!');
        if (this.showSummary) this.Debug(this.Summary());
        if (this.timeRotation || this.rowsRotation) this.RotateFiles();
        this.IsInitialized = false;
    }

    public static StartTimer(name : string) : void {
        let ts : TimeStamp = new TimeStamp(name);
        this.timeStamps.push(ts);
        this.Debug(`Timer ${name} started`)
    }

    public static StopTimer(name : string) : void {
        let ts : TimeStamp = this.timeStamps.find((ts : TimeStamp) => ts.Name === name);
        if (ts) {
            this.Debug(`Timer ${name} finished at ${PrettyDate(ts.Stamp())}`);
            this.timeStamps.splice(this.timeStamps.indexOf(ts), 1);
        }
    }
}

export default Logger;

export { Logger, LogLevels, LoggerConfig, TimeRotations }