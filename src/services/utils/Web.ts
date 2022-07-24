enum SortingOrders {
    Ascending,
    Descending
}

type Sort = {
    column : string;
    order : SortingOrders;
}

interface Query {
    id? : number;
    limit? : number;
    skip? : number;
    sort? : Sort[];
}

export { Query, Sort, SortingOrders }