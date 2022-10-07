import Tax from '../../../models/tax/Tax';
import { IDeleter } from '../../../types/interfaces/DatabaseAPI';

class TaxDeleter implements IDeleter<Tax> {
	public async delete(id: number): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id });
		tax.isDeleted = true;
		await Tax.save(tax);

		return tax;
	}
}

export default new TaxDeleter();
