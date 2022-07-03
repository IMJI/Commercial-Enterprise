import { performance } from 'node:perf_hooks';

class TimeStamp {
    public readonly Name : string;
    private stamps : number[] = [];

    constructor(name : string) {
        this.Name = name;
        this.Stamp();
    }

    public Stamp() : number {
        let now = performance.now();
        this.stamps.push(now);
        return now - this.stamps[this.stamps.length - 2];
    }

    public GetStamps() : number[] { return this.stamps; }
}

export default TimeStamp;