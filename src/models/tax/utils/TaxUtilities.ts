import Schemes from '../../../services/utils/Schemes';
import SortableColumn from '../../../types/utils/SortableColumns';

const taxQueryScheme = Schemes.query.append({
	name: Schemes.oneOrMoreShortString,
	valueFrom: Schemes.percent,
	valueTo: Schemes.percent,
	isDeleted: Schemes.bool
});

const taxBodyScheme = Schemes.query.append({
	name: Schemes.shortString,
	value: Schemes.percent,
	isDeleted: Schemes.bool
});

const taxBodyStrictScheme = Schemes.query.append({
	name: Schemes.shortString.required(),
	value: Schemes.percent.required(),
	isDeleted: Schemes.bool
});

const taxSortableColumns: SortableColumn[] = [
	{ name: 'name', column: 'tax.name' },
	{ name: 'value', column: 'tax.value' }
];

export {
	taxQueryScheme,
	taxBodyScheme,
	taxBodyStrictScheme,
	taxSortableColumns
};
