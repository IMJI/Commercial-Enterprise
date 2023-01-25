import Schemes from '../../../utils/Schemes';
import SortableColumn from '../../../types/utils/SortableColumns';

const productQueryScheme = Schemes.query.append({
	name: Schemes.oneOrMoreShortString,
	category: Schemes.oneOrMoreShortString,
	description: Schemes.text,
	isDeleted: Schemes.bool
});

const productBodyScheme = Schemes.query.append({
	vendorCode: Schemes.id,
	name: Schemes.shortString,
	category: Schemes.id,
	description: Schemes.text,
	isDeleted: Schemes.bool
});

const productBodyStrictScheme = Schemes.query.append({
	vendorCode: Schemes.id.required(),
	name: Schemes.shortString.required(),
	category: Schemes.id.required(),
	description: Schemes.text,
	isDeleted: Schemes.bool
});

const productSortableColumns: SortableColumn[] = [
	{ name: 'name', column: 'product.name' },
	{ name: 'category', column: 'product.category.name' }
];

export {
	productQueryScheme,
	productBodyScheme,
	productBodyStrictScheme,
	productSortableColumns
};
