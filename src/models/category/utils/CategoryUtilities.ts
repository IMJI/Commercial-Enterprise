import Schemes from '../../../services/utils/Schemes';
import SortableColumn from '../../../types/utils/SortableColumns';

const categoryQueryScheme = Schemes.query.append({
	name: Schemes.oneOrMoreShortString,
	isDeleted: Schemes.bool
});

const categoryBodyScheme = Schemes.query.append({
	name: Schemes.shortString,
	isDeleted: Schemes.bool
});

const categoryBodyStrictScheme = Schemes.query.append({
	name: Schemes.shortString.required(),
	isDeleted: Schemes.bool
});

const categorySortableColumns: SortableColumn[] = [
	{ name: 'name', column: 'category.name' }
];

export {
	categoryQueryScheme,
	categoryBodyScheme,
	categoryBodyStrictScheme,
	categorySortableColumns
};
