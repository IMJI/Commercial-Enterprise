import NotFoundException from '../../../../exception/NotFoundException';
import Tax from '../../../../models/tax/Tax';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class TaxAdminDeleter implements IDeleter<Tax> {
	public async delete(id: number): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id });
		if (tax) {
			await Tax.delete(id);

			return tax;
		}
		else throw new NotFoundException(`Can't find tax with id = ${id}`);
	}
}

export default new TaxAdminDeleter();
