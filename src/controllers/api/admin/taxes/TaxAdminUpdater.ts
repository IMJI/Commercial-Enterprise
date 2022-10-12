import TaxUpdateOptions from '../../../../models/tax/dto/TaxUpdateOptions';
import Tax from '../../../../models/tax/Tax';
import { IUpdater } from '../../../../types/interfaces/DatabaseAPI';

class TaxAdminUpdater implements IUpdater<Tax> {
	public async update(id: number, options: TaxUpdateOptions): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id });
		if (options.name) tax.name = options.name;
		if (options.value) tax.value = options.value;
		if (options.isDeleted !== undefined) tax.isDeleted = options.isDeleted;
		await Tax.save(tax);

		return tax;
	}
}

export default new TaxAdminUpdater();
