enum SortingOrders {
    Ascending,
    Descending
}

class Sort {
    private column : string;
    public get Column() : string { return this.column; }
    private order : SortingOrders;
    public get Order() : SortingOrders { return this.order; }

    constructor(column : string, order : SortingOrders) {
        this.column = column;
        this.order = order;
    }

    public static FromString(str : string) : Sort[] {
        const sortings : Sort[] = [];
        const sortingsStr : string[] = str.split(',');
        sortingsStr.forEach(sorting => {
            const opts = sorting.split(':');
            let order : SortingOrders = opts[1].toLowerCase() === 'desc' ? SortingOrders.Descending : SortingOrders.Ascending;
            const s : Sort = new Sort(opts[0], order);
            sortings.push(s);
        });
        return sortings;
    }
}

interface Query {
    id? : number;
    limit? : number;
    skip? : number;
    sort? : Sort[];
}

export { Query, Sort, SortingOrders }