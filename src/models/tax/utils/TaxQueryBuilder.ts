import { SelectQueryBuilder } from 'typeorm';
import {
	TaxFindOptions,
	ExtendedTaxFindOptions
} from '../../../models/tax/dto/TaxFindOptions';
import Database from '../../../Database';
import BaseQueryBuilder from '../../../types/utils/BaseQueryBuilder';
import Tax from '../Tax';
import { taxSortableColumns } from './TaxUtilities';

class TaxQueryBuilder {
	public static build(options: TaxFindOptions): SelectQueryBuilder<Tax> {
		let builder = Database.dataSource
			.getRepository(Tax)
			.createQueryBuilder('tax')
			.where('tax.isDeleted = false');

		if (options.name && options.name.length > 0)
			builder = builder.andWhere('tax.name IN (:...name)', {
				name: options.name
			});
		if (options.valueFrom)
			builder = builder.andWhere('tax.value >= :valueFrom', {
				valueFrom: options.valueFrom
			});
		if (options.valueTo)
			builder = builder.andWhere('tax.value <= :valueTo', {
				valueTo: options.valueTo
			});
		builder = BaseQueryBuilder.build<Tax>(builder, taxSortableColumns, options);

		return builder;
	}

	public static buildExtended(
		options: ExtendedTaxFindOptions
	): SelectQueryBuilder<Tax> {
		let builder = Database.dataSource
			.getRepository(Tax)
			.createQueryBuilder('tax')
			.where('1 = 1');

		if (options.name && options.name.length > 0)
			builder = builder.andWhere('tax.name IN (:...name)', {
				name: options.name
			});
		if (options.valueFrom)
			builder = builder.andWhere('tax.cost >= :valueFrom', {
				valueFrom: options.valueFrom
			});
		if (options.valueTo)
			builder = builder.andWhere('tax.cost <= :valueTo', {
				valueTo: options.valueTo
			});
		if (options.isDeleted !== undefined)
			builder = builder.andWhere('tax.isDeleted = :isDeleted', {
				isDeleted: options.isDeleted
			});
		builder = BaseQueryBuilder.build<Tax>(builder, taxSortableColumns, options);

		return builder;
	}
}

export default TaxQueryBuilder;
