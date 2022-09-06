import { convertToNumber } from '../services/utils/Utils';

enum NumberRangeType {
	from,
	to,
	range
}

class NumberRange {
	private _from: number;
	private _to: number;
	private _type: NumberRangeType;

	public get from() {
		return this._from;
	}
	public set from(value: number) {
		if (this._to && value <= this._to) this._from = value;
		else throw new Error('Start value must be lower than or equal end value');
	}
	public get to() {
		return this._to;
	}
	public set to(value: number) {
		if (this._from && value >= this._from) this._to = value;
		else throw new Error('End value must be greater than or equal start value');
	}

	private constructor(from?: number, to?: number) {
		if (from && to) {
			this._type = NumberRangeType.range;
			if (from <= to) {
				this._from = from;
				this._to = to;
			} else throw new Error('Start value must be lower than or equal end value');
		} else if (from) {
			this._type = NumberRangeType.from;
			this._from = from;
		} else if (to) {
			this._type = NumberRangeType.to;
			this._to = to;
		}
	}

	public static fromString(str: string): NumberRange {
		const split: string[] = str.split(':');
		if (split[0] !== '' && split[1] !== '') {
			const from: number = convertToNumber(split[0]);
			const to: number = convertToNumber(split[1]);
			return new NumberRange(from, to);
		} else if (split[1] === '') {
			const from: number = convertToNumber(split[0]);
			return new NumberRange(from, undefined);
		} else if (split[0] === '') {
			const to: number = convertToNumber(split[1]);
			return new NumberRange(undefined, to);
		}
	}

	public toString(): string {
		if (this._type === NumberRangeType.range) return this._from + ':' + this._to;
		else if (this._type === NumberRangeType.from) return this._from + ':';
		else if (this._type === NumberRangeType.to) return ':' + this._to;
	}
}

export default NumberRange;
