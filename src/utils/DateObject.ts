const monthNames: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
const shortMonthNames: string[] = [
	'JAN',
	'FEB',
	'MAR',
	'APR',
	'MAY',
	'JUN',
	'JUL',
	'AUG',
	'SEP',
	'OCT',
	'NOV',
	'DEC'
];
const daysOfWeek: string[] = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];
const shortDaysOfWeek: string[] = [
	'MON',
	'TUE',
	'WED',
	'THU',
	'FRI',
	'SAT',
	'SUN'
];

class DateObject {
	private _date: Date;

	get fullYear(): number {
		return this._date.getFullYear();
	}
	get shortYear(): number {
		return +this.fullYear.toString().substring(2);
	}
	get month(): number {
		return this._date.getMonth() + 1;
	}
	get monthString(): string {
		return this.month < 10 ? `0${this.month}` : this.month.toString();
	}
	get fullMonthName(): string {
		return monthNames[this.month - 1];
	}
	get shortMonthName(): string {
		return shortMonthNames[this.month - 1];
	}
	get day(): number {
		return this._date.getDate();
	}
	get dayString(): string {
		return this.day < 10 ? `0${this.day}` : this.day.toString();
	}
	get dayOfWeek(): number {
		return this._date.getDay();
	}
	get fullDayOfWeekString(): string {
		return daysOfWeek[this.dayOfWeek - 1];
	}
	get shortDayOfWeekString(): string {
		return shortDaysOfWeek[this.dayOfWeek - 1];
	}
	get hours(): number {
		return this._date.getHours();
	}
	get hoursString(): string {
		return this.hours < 10 ? `0${this.hours}` : this.hours.toString();
	}
	get hoursAmPm(): number {
		return this.hours % 12 ? this.hours % 12 : 12;
	}
	get hoursAmPmString(): string {
		return `${this.hoursAmPm} ${this.hours >= 12 ? 'PM' : 'AM'}`;
	}
	get minutes(): number {
		return this._date.getMinutes();
	}
	get minutesString(): string {
		return this.minutes < 10 ? `0${this.minutes}` : this.minutes.toString();
	}
	get seconds(): number {
		return this._date.getSeconds();
	}
	get secondsString(): string {
		return this.seconds < 10 ? `0${this.seconds}` : this.seconds.toString();
	}
	get milliseconds(): number {
		return this._date.getMilliseconds();
	}
	get millisecondsString(): string {
		let msstr = '';
		if (this.milliseconds < 100) msstr += '0';
		if (this.milliseconds < 10) msstr += '0';
		return msstr + this.milliseconds.toString();
	}
	get millisecondsShortString(): string {
		return this.millisecondsString.substring(0, 2);
	}

	constructor(date?: Date) {
		this._date = date ?? new Date();
	}

	public format(format: string): string {
		return format
			.replace('YYYY', this.fullYear.toString())
			.replace('YY', this.shortYear.toString())
			.replace('M', this.month.toString())
			.replace('MM', this.monthString)
			.replace('MONTH', this.fullMonthName)
			.replace('MON', this.shortMonthName)
			.replace('D', this.day.toString())
			.replace('DD', this.dayString)
			.replace('DAYOFWEEK', this.fullDayOfWeekString)
			.replace('DOW', this.shortDayOfWeekString)
			.replace('h', this.hours.toString())
			.replace('hh', this.hoursString)
			.replace('h12', this.hoursAmPm.toString())
			.replace('hh12', this.hoursAmPmString)
			.replace('m', this.minutes.toString())
			.replace('mm', this.minutesString)
			.replace('s', this.seconds.toString())
			.replace('ss', this.secondsString)
			.replace('ms', this.milliseconds.toString())
			.replace('msms', this.millisecondsString)
			.replace('shortms', this.millisecondsShortString);
	}
}

export { DateObject, daysOfWeek, shortDaysOfWeek, monthNames, shortMonthNames };
