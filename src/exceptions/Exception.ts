abstract class Exception extends Error {
	private _statusCode?: number;
	public get statusCode(): number {
		if (this._statusCode) return this._statusCode;
		else return -1;
	}
	public get stack(): string {
		return super.stack ? super.stack : '';
	}
	public get name(): string {
		return super.name;
	}
	public get message(): string {
		return super.message;
	}

	constructor(msg: string, statusCode?: number) {
		super(msg);
		super.name = this.constructor.name;
		Object.setPrototypeOf(this, Exception.prototype);
		if (statusCode) this._statusCode = statusCode;
	}
}

export default Exception;
