import Schemes from '../../../services/utils/Schemes';
import SortableColumn from '../../../types/utils/SortableColumns';

const taxQueryScheme = Schemes.query.append({
	name: Schemes.oneOrMoreShortString,
	valueFrom: Schemes.money,
	valueTo: Schemes.money,
	isDeleted: Schemes.bool
});


const taxSortableColumns: SortableColumn[] = [
	{ name: 'name', column: 'tax.name' },
	{ name: 'value', column: 'tax.value' },
	{ name: 'isDeleted', column: 'tax.isDeleted' }
];

export { taxQueryScheme, taxSortableColumns };
