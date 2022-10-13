import Tax from '../../../../models/tax/Tax';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class TaxAdminDeleter implements IDeleter<Tax> {
	public async delete(id: number): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id });
		await Tax.delete(id);

		return tax;
	}
}

export default new TaxAdminDeleter();
