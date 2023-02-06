import Database from "../../Database";
import QueryBuilder from "../../types/utils/QueryBuilder";
import { toArray } from "../../utils/Utils";
import Price from "./Price";
import PriceFindOptions from "./PriceFindOptions";

class PriceQueryBuilder extends QueryBuilder<Price> {
    constructor(name: string) {
        const repoitory = Database.dataSource.getRepository(Price);
        const sortableColumns = ['value'];
        super(name, repoitory, sortableColumns, [
            { column: 'product', relation: 'product' }
        ]);
    }

    protected buildQueryBody(options: PriceFindOptions): void {
        if (options.product && options.product.length > 0)
			this.builder = this.builder.andWhere(`${this.name}.productId IN (:...product)`, {
				product: toArray<number>(options.product)
			});

        if (options.date) {
			this.builder = this.builder.andWhere(`${this.name}.dateFrom <= :date`, {
				date: options.date
			});
            this.builder = this.builder.andWhere(
                `${this.name}.dateTo IS NULL OR ${this.name}.dateTo >= :date`, {
				date: options.date
			});
        }

        if (options.valueFrom)
			this.builder = this.builder.andWhere(`${this.name}.value >= :valueFrom`, {
				valueFrom: options.valueFrom
			});

        if (options.valueTo)
			this.builder = this.builder.andWhere(`${this.name}.value <= :valueTo`, {
				valueTo: options.valueTo
			});
    }
}

export default PriceQueryBuilder;