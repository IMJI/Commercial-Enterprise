import FindOptions from "../../types/dto/FindOptions";

class OutgoingFindOptions extends FindOptions {
    products: number[];
    taxes: number[];
    managers: number[];
    quantityFrom: number;
    quantityTo: number;
    costFrom: number;
    costTo: number;
    statuses: string[];
}

export default OutgoingFindOptions;