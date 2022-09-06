enum SortingOrders {
	ascending = 'asc',
	descending = 'desc'
}

class Sort {
	private _column: string;
	public get column(): string {
		return this._column;
	}
	private _order: SortingOrders;
	public get order(): SortingOrders {
		return this._order;
	}

	constructor(column: string, order: SortingOrders) {
		this._column = column;
		this._order = order;
	}

	public static fromString(str: string): Sort[] {
		const sortings: Sort[] = [];
		const sortingsStr: string[] = str.split(',');
		sortingsStr.forEach((sorting) => {
			const opts = sorting.split(':');
			const order: SortingOrders = opts[1].toLowerCase() === 'desc' ? SortingOrders.descending : SortingOrders.ascending;
			const s: Sort = new Sort(opts[0], order);
			sortings.push(s);
		});
		return sortings;
	}
}

export { Sort, SortingOrders }