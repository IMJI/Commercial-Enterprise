import { SelectQueryBuilder } from 'typeorm';
import {
	ManagerFindOptions,
	ExtendedManagerFindOptions
} from '../dto/ManagerFindOptions';
import Database from '../../../Database';
import BaseQueryBuilder from '../../../types/utils/BaseQueryBuilder';
import Manager from '../Manager';
import { managerSortableColumns } from './ManagerUtilities';

class ManagerQueryBuilder {
	public static build(
		options: ManagerFindOptions
	): SelectQueryBuilder<Manager> {
		let builder = Database.dataSource
			.getRepository(Manager)
			.createQueryBuilder('manager')
			.where('manager.dismissalDate is null');

		if (options.firstName && options.firstName.length > 0)
			builder = builder.andWhere('manager.firstName IN (:...firstName)', {
				firstName: options.firstName
			});

		if (options.lastName && options.lastName.length > 0)
			builder = builder.andWhere('manager.lastName IN (:...lastName)', {
				lastName: options.lastName
			});

		if (options.patronymic && options.patronymic.length > 0)
			builder = builder.andWhere('manager.patronymic IN (:...patronymic)', {
				patronymic: options.patronymic
			});

		if (options.percentFrom)
			builder = builder.andWhere('manager.percent >= :percentFrom', {
				percentFrom: options.percentFrom
			});

		if (options.percentTo)
			builder = builder.andWhere('manager.percent <= :percentTo', {
				percentTo: options.percentTo
			});

		if (options.hireDateFrom)
			builder = builder.andWhere('manager.hireDate <= :hireDateFrom', {
				hireDateFrom: options.hireDateFrom
			});

		if (options.hireDateTo)
			builder = builder.andWhere('manager.hireDate <= :hireDateTo', {
				hireDateTo: options.hireDateTo
			});

		if (options.parent)
			builder = builder.andWhere('manager.parent.id = :parent', {
				parent: options.parent
			});

		builder = BaseQueryBuilder.build<Manager>(
			builder,
			managerSortableColumns,
			options
		);

		return builder;
	}

	public static buildExtended(
		options: ExtendedManagerFindOptions
	): SelectQueryBuilder<Manager> {
		let builder = Database.dataSource
			.getRepository(Manager)
			.createQueryBuilder('manager')
			.where('1 = 1');

		if (options.firstName && options.firstName.length > 0)
			builder = builder.andWhere('manager.firstName IN (:...firstName)', {
				firstName: options.firstName
			});

		if (options.lastName && options.lastName.length > 0)
			builder = builder.andWhere('manager.lastName IN (:...lastName)', {
				lastName: options.lastName
			});

		if (options.patronymic && options.patronymic.length > 0)
			builder = builder.andWhere('manager.patronymic IN (:...patronymic)', {
				patronymic: options.patronymic
			});

		if (options.percentFrom)
			builder = builder.andWhere('manager.percent >= :percentFrom', {
				percentFrom: options.percentFrom
			});

		if (options.percentTo)
			builder = builder.andWhere('manager.percent <= :percentTo', {
				percentTo: options.percentTo
			});

		if (options.hireDateFrom)
			builder = builder.andWhere('manager.hireDate <= :hireDateFrom', {
				hireDateFrom: options.hireDateFrom
			});

		if (options.hireDateTo)
			builder = builder.andWhere('manager.hireDate <= :hireDateTo', {
				hireDateTo: options.hireDateTo
			});

		if (options.dismissalDateFrom)
			builder = builder.andWhere(
				'manager.dismissalDate <= :dismissalDateFrom',
				{
					dismissalDateFrom: options.dismissalDateFrom
				}
			);

		if (options.dismissalDateTo)
			builder = builder.andWhere('manager.dismissalDate <= :dismissalDateTo', {
				dismissalDateTo: options.dismissalDateTo
			});

		builder = BaseQueryBuilder.build<Manager>(
			builder,
			managerSortableColumns,
			options
		);

		return builder;
	}
}

export default ManagerQueryBuilder;
