const MonthNames : string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ShortMonthNames : string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DaysOfWeek : string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const ShortDaysOfWeek : string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];


class DateObject {
    private _date : Date;

    get FullYear() : number { return this._date.getFullYear(); }
    get ShortYear() : number { return +this.FullYear.toString().substring(2); }
    get Month() : number { return this._date.getMonth() + 1; }
    get MonthString() : string { return this.Month < 10 ? `0${this.Month}` : this.Month.toString(); }
    get FullMonthName() : string { return MonthNames[this.Month - 1]; }
    get ShortMonthName() : string { return ShortMonthNames[this.Month - 1]; }
    get Day() : number { return this._date.getDate(); }
    get DayString() : string { return this.Day < 10 ? `0${this.Day}` : this.Day.toString(); }
    get DayOfWeek() : number { return this._date.getDay(); }
    get FullDayOfWeekString() : string { return DaysOfWeek[this.DayOfWeek - 1]; }
    get ShortDayOfWeekString() : string { return ShortDaysOfWeek[this.DayOfWeek - 1]; }
    get Hours() : number { return this._date.getHours(); }
    get HoursString() : string { return this.Hours < 10 ? `0${this.Hours}` : this.Hours.toString(); }
    get HoursAMPM() : number { return this.Hours % 12 ? this.Hours % 12 : 12; }
    get HoursAMPMString() : string { return `${this.HoursAMPM} ${this.Hours >= 12 ? 'PM' : 'AM'}` }
    get Minutes() : number { return this._date.getMinutes(); }
    get MinutesString() : string { return this.Minutes < 10 ? `0${this.Minutes}` : this.Minutes.toString(); }
    get Seconds() : number { return this._date.getSeconds(); }
    get SecondsString() : string { return this.Seconds < 10 ? `0${this.Seconds}` : this.Seconds.toString(); }
    get Milliseconds() : number { return this._date.getMilliseconds(); }
    get MillisecondsString() : string {
        let msstr = '';
        if (this.Milliseconds < 100) msstr += '0';
        if (this.Milliseconds < 10) msstr += '0';
        return msstr + this.Milliseconds.toString();
    }
    get MillisecondsShortString() : string { return this.MillisecondsString.substring(0, 2); }

    constructor(date? : Date) {
        this._date = date ?? new Date();
    }
    
    public Format(format: string) : string {
        return format
            .replace('YYYY', this.FullYear.toString())
            .replace('YY', this.ShortYear.toString())
            .replace('M', this.Month.toString())
            .replace('MM', this.MonthString)
            .replace('MONTH', this.FullMonthName)
            .replace('MON', this.ShortMonthName)
            .replace('D', this.Day.toString())
            .replace('DD', this.DayString)
            .replace('DAYOFWEEK', this.FullDayOfWeekString)
            .replace('DOW', this.ShortDayOfWeekString)
            .replace('h', this.Hours.toString())
            .replace('hh', this.HoursString)
            .replace('h12', this.HoursAMPM.toString())
            .replace('hh12', this.HoursAMPMString)
            .replace('m', this.Minutes.toString())
            .replace('mm', this.MinutesString)
            .replace('s', this.Seconds.toString())
            .replace('ss', this.SecondsString)
            .replace('ms', this.Milliseconds.toString())
            .replace('msms', this.MillisecondsString)
            .replace('shortms', this.MillisecondsShortString);
    }
}

export { DateObject, DaysOfWeek, ShortDaysOfWeek, MonthNames, ShortMonthNames }