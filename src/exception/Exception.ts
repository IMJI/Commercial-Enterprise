abstract class Exception extends Error {
	private _isFatal: boolean;
	public get isFatal(): boolean {
		return this._isFatal;
	}

	private _httpCode?: number;
	public get httpCode(): number {
		if (this._httpCode) return this._httpCode;
		else return -1;
	}

	constructor(msg: string, isFatal = false, httpCode?: number) {
		super(msg);
		Object.setPrototypeOf(this, Exception.prototype);
		this._isFatal = isFatal;
		if (httpCode) this._httpCode = httpCode;
	}
}

export default Exception;
