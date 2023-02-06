import FindOptions from "../../types/dto/FindOptions";

class PriceFindOptions extends FindOptions {
    product: number[];
    date: Date;
    valueFrom: number;
    valueTo: number;
}

export default PriceFindOptions;