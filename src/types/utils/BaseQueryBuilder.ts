import { SelectQueryBuilder } from 'typeorm';
import FindOptions from '../dto/FindOptions';
import { Sort } from './Sort';
import SortableColumn from './SortableColumns';

class BaseQueryBuilder {
	public static build<T>(
		builder: SelectQueryBuilder<T>,
		sortableColumns: SortableColumn[],
		options: FindOptions
	): SelectQueryBuilder<T> {
		if (options.sort && options.sort.length > 0) {
			let isFirst = true;
			// options.sort.forEach((sort: Sort) => {
			// 	const sortingColumn = sortableColumns.find(
			// 		(s) => s.name === sort.column
			// 	);
			// 	if (sortingColumn) {
			// 		if (isFirst) {
			// 			builder = builder.orderBy(sortingColumn.column, sort.order);
			// 			isFirst = false;
			// 		} else builder = builder.addOrderBy(sortingColumn.column, sort.order);
			// 	}
			// });
		}
		if (options.limit) builder = builder.take(options.limit);
		if (options.skip) builder = builder.skip(options.skip);

		return builder;
	}
}

export default BaseQueryBuilder;
