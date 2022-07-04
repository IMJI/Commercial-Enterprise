import LogLevels from './LogLevels';
import TimeRotations from './TimeRotations';

type LoggerConfig = {
    dir? : string;
    maxCacheSize? : number;
    format? : string;
    showSummary? : boolean;
    rowsRotation? : number;
    timeRotation? : TimeRotations;
    writeCombinedLog? : boolean;
    writeSeparatedLog? : boolean;
    hideFromConsole? : LogLevels[];
    hideFromFile? : LogLevels[];
    separatedLogLevels? : LogLevels[];
}

export default LoggerConfig;