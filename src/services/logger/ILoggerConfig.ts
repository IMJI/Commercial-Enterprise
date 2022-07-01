import LogLevels from "./LogLevels";

interface ILoggerConfig {
    dir? : string;
    // fileNameFormat? : string;
    maxCacheSize? : number;
    format? : string;
    showSummary? : boolean;
    rowsRotation? : number;
    timeRotation? : string;
    writeCombinedLog? : boolean;
    writeSeparatedLog? : boolean;
    showInConsole? : LogLevels[];
    writeToFile? : LogLevels[];
    separatedLogLevels? : LogLevels[];
}

export default ILoggerConfig;