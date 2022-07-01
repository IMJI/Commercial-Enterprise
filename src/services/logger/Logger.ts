import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import LogLevels from './LogLevels';
import ILoggerConfig from './ILoggerConfig';
import IDateObject from '../../interfaces/IDateObject';
import { DateToObject, GetCallerFile, PrettyDate } from '../Utils'

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
    private static timeRotation : string;

    private static cache : string[] = [];
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

    public static IsInitialized : boolean = false;

    public static Initialize(config? : ILoggerConfig) {
        this.uptimeStart = Date.now();

        this.dir = config.dir || './logs';
        this.cacheSize = config.maxCacheSize || 0;
        this.showSummary = config.showSummary || true;
        this.format = config.format || '$YYYY-$MM-$DD $HR:$MIN:$SEC:$MS $FILE $LEVEL $MESSAGE';
        this.filePath = path.join(this.dir, `latest.log`);
        this.rowsRotation = config.rowsRotation || 0;
        this.timeRotation = config.timeRotation || '';
        
        if (this.rowsRotation || this.timeRotation) this.lastRotation = Date.now();
        if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
        this.IsInitialized = true;
    }

    private static CheckRotation() : void {
        if (this.rowsRotation) {
            
        }
    }

    private static WriteCache() : void {
        fs.appendFileSync(this.filePath, this.cache.map(l => `${l}\n`).join(''));
        this.cache = [];
    }

    private static Summary() : string {
        return `Uptime: ${PrettyDate(Date.now() - this.uptimeStart)}, Warnings: ${this.messages['WARN']}, Errors: ${this.messages['ERROR']}, Fatal: ${this.messages['FATAL']}`;
    }

    private static FormatString(level : string, message : string) : object {
        let date : IDateObject = DateToObject(new Date());
        let fileOut = this.format
            .replace('$MESSAGE', message)
            .replace('$FILE', GetCallerFile(4))
            .replace('$YYYY', String(date.year))
            .replace('$MM', String(date.monthTwoDigits))
            .replace('$DD', String(date.dayTwoDigits))
            .replace('$HR', String(date.hourTwoDigits))
            .replace('$MIN', String(date.minutesTwoDigits))
            .replace('$SEC', String(date.secondsTwoDigits))
            .replace('$MS', String(date.milisecondsTwoDigits))
        let consoleOut = fileOut.replace('$LEVEL', chalk.bold(colors[level](`[${level}]`)));
        fileOut = fileOut.replace('$LEVEL', level);
        return { fileOut, consoleOut }
    }

    private static Log(level : LogLevels, message : string) : void {
        this.CheckRotation();
        if (!this.IsInitialized) throw new Error('Logger was not initialized.');
        let output : object = this.FormatString(level, message);
        console.log(output['consoleOut']);
        this.cache.push(output['fileOut']);
        this.messages[level]++;
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
        this.WriteCache();
    }
}

export default Logger;