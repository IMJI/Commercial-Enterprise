import IDateObject from '../interfaces/IDateObject';

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export function ReviveJSON(key : string, value : any) : any {
    // revive ISO 8601 date strings to instances of Date
    if (typeof value === 'string' && iso8601RegExp.test(value)) {
        return new Date(value);
    } else {
        return value;
    }
}

const months : string[][] = [
    ['January', 'JAN'],
    ['February', 'FEB'],
    ['March', 'MAR'],
    ['April', 'APR'],
    ['May', 'MAY'],
    ['June', 'JUN'],
    ['July', 'JUL'],
    ['August', 'AUG'],
    ['September', 'SEP'],
    ['October', 'OCT'],
    ['November', 'NOV'],
    ['December', 'DEC']
]

export function DateToObject(date : Date) : IDateObject {
    return {
        year: date.getFullYear(),
        yearShort: date.getFullYear() % 100,
        month: date.getMonth() + 1,
        monthTwoDigits: date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`,
        monthName: months[date.getMonth()][0],
        monthShortname: months[date.getMonth()][1],
        day: date.getDate(),
        dayTwoDigits: date.getDate() < 9 ? `0${date.getDate()}` : `${date.getDate()}`,
        hour : date.getHours(),
        hourTwoDigits: date.getHours() < 9 ? `0${date.getHours()}` : `${date.getHours()}`,
        minutes : date.getMinutes(),
        minutesTwoDigits: date.getMinutes() < 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`,
        seconds : date.getSeconds(),
        secondsTwoDigits: date.getSeconds() < 9 ? `0${date.getSeconds()}` : `${date.getSeconds()}`,
        miliseconds: date.getMilliseconds(),
        milisecondsTwoDigits: date.getMilliseconds() + 1 < 9 ? `0${date.getMilliseconds() + 1}` : `${date.getMilliseconds() + 1}`,
    }
}

export function GetCallerFile(depth : number) : string {
    const err : any = new Error();
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = err.stack;
    Error.prepareStackTrace = undefined;
    const filepath = stack[depth].getFileName().split('\\');
    return filepath[filepath.length - 1];
}

export function PrettyDate(dateInMs : number) {
    let prettyDate = '';
    let ms : number = Math.floor(dateInMs % 1000);
    let secs : number = Math.floor((dateInMs / 1000) % 60);
    let mins : number = Math.floor((dateInMs / (1000 * 60)) % 60);
    let hours : number = Math.floor((dateInMs / (1000 * 60 * 60)) % 24);
    let days : number = Math.floor(dateInMs / (1000 * 60 * 60 * 24));
    if (days) prettyDate += `${days}d `;
    if (days || hours) prettyDate += `${hours}h `;
    if (days || hours || mins) prettyDate += `${mins}m `;
    if (days || hours || mins || secs) prettyDate += `${secs}s `;
    prettyDate += `${ms}ms`;
    return prettyDate;
}