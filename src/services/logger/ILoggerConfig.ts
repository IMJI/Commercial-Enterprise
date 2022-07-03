import LogLevels from './LogLevels';
import TimeRotations from './TimeRotations';

interface ILoggerConfig {
    dir? : string;
    maxCacheSize? : number;
    format? : string;
    showSummary? : boolean;
    rowsRotation? : number;
    timeRotation? : TimeRotations;
    writeCombinedLog? : boolean;
    writeSeparatedLog? : boolean;
    showInConsole? : LogLevels[];
    writeToFile? : LogLevels[];
    separatedLogLevels? : LogLevels[];
}

export default ILoggerConfig;