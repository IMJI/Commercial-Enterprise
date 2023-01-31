import Schemes from '../../../validation/Schemes';
import SortableColumn from '../../../types/utils/SortableColumns';

const managerQueryScheme = Schemes.query.append({
	firstName: Schemes.oneOrMoreShortString,
	lastName: Schemes.oneOrMoreShortString,
	patronymic: Schemes.oneOrMoreShortString,
	percent: Schemes.percent,
	hireDate: Schemes.date,
	dismissalDate: Schemes.date,
	parent: Schemes.id
});

const managerBodyScheme = Schemes.query.append({
	firstName: Schemes.shortString,
	lastName: Schemes.shortString,
	patronymic: Schemes.shortString,
	percent: Schemes.percent,
	hireDate: Schemes.date,
	dismissalDate: Schemes.date,
	parent: Schemes.id
});

const managerBodyStrictScheme = Schemes.query.append({
	firstName: Schemes.shortString.required(),
	lastName: Schemes.shortString.required(),
	patronymic: Schemes.shortString,
	percent: Schemes.percent.required(),
	hireDate: Schemes.date.required(),
	dismissalDate: Schemes.date,
	parent: Schemes.id
});

const managerSortableColumns: SortableColumn[] = [
	{ name: 'firstName', column: 'manager.firstName' },
	{ name: 'lastName', column: 'manager.lastName' },
	{ name: 'patronymic', column: 'manager.patronymic' },
	{ name: 'percent', column: 'manager.percent' },
	{ name: 'hireDate', column: 'manager.hireDate' },
	{ name: 'dismissalDate', column: 'manager.dismissalDate' }
];

export {
	managerQueryScheme,
	managerBodyScheme,
	managerBodyStrictScheme,
	managerSortableColumns
};
