import { performance } from 'node:perf_hooks';

class TimeStamp {
	public readonly name: string;
	private stamps: number[] = [];

	constructor(name: string) {
		this.name = name;
		this.stamp();
	}

	public stamp(): number {
		const now = performance.now();
		this.stamps.push(now);
		return now - this.stamps[this.stamps.length - 2];
	}

	public getStamps(): number[] {
		return this.stamps;
	}
}

export default TimeStamp;
