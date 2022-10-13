import NotFoundException from '../../../../exception/NotFoundException';
import TaxUpdateOptions from '../../../../models/tax/dto/TaxUpdateOptions';
import Tax from '../../../../models/tax/Tax';
import { IUpdater } from '../../../../types/interfaces/DatabaseAPI';

class TaxAdminUpdater implements IUpdater<Tax> {
	public async update(id: number, options: TaxUpdateOptions): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id });
		if (tax) {
			if (options.name) tax.name = options.name;
			if (options.value) tax.value = options.value;
			if (options.isDeleted !== undefined) tax.isDeleted = options.isDeleted;
			await Tax.save(tax);
	
			return tax;
		}
		else throw new NotFoundException(`Can't find tax with id = ${id}`);
	}
}

export default new TaxAdminUpdater();
