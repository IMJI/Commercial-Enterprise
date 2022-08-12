const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

export function ReviveJSON(key: string, value: any): any {
	// revive ISO 8601 date strings to instances of Date
	if (typeof value === 'string' && iso8601RegExp.test(value)) {
		return new Date(value);
	} else {
		return value;
	}
}

export function GetCallerFile(depth: number): string {
	const err: any = new Error();
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = err.stack;
	Error.prepareStackTrace = undefined;
	const filepath = stack[depth].getFileName().split('\\');
	return filepath[filepath.length - 1];
}

export function PrettyDate(dateInMs: number) {
	let prettyDate = '';
	const ms: number = Math.floor(dateInMs % 1000);
	const secs: number = Math.floor((dateInMs / 1000) % 60);
	const mins: number = Math.floor((dateInMs / (1000 * 60)) % 60);
	const hours: number = Math.floor((dateInMs / (1000 * 60 * 60)) % 24);
	const days: number = Math.floor(dateInMs / (1000 * 60 * 60 * 24));
	if (days) prettyDate += `${days}d `;
	if (days || hours) prettyDate += `${hours}h `;
	if (days || hours || mins) prettyDate += `${mins}m `;
	if (days || hours || mins || secs) prettyDate += `${secs}s `;
	prettyDate += `${ms}ms`;
	return prettyDate;
}

export class Time {
	public static Millisecond = 1;
	public static Second = 1000;
	public static Minute: number = 1000 * 60;
	public static Hour: number = 1000 * 60 * 60;
	public static Day: number = 1000 * 60 * 60 * 24;
	public static Week: number = 1000 * 60 * 60 * 24 * 7;
}
