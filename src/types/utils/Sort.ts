import { toArray } from '../../services/utils/Utils';

enum SortingOrders {
	ascending = 'ASC',
	descending = 'DESC'
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

	public static fromString(strs: string | string[]): Sort[] {
		const sortings: Sort[] = [];
		strs = toArray<string>(strs);
		strs.forEach((sorting) => {
			const opts = sorting.split(':');
			const order: SortingOrders =
				opts[1].toLowerCase() === 'desc'
					? SortingOrders.descending
					: SortingOrders.ascending;
			const s: Sort = new Sort(opts[0], order);
			sortings.push(s);
		});
		return sortings;
	}
}

export { Sort, SortingOrders };
