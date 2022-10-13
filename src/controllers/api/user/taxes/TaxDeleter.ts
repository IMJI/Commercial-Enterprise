import NotFoundException from '../../../../exception/NotFoundException';
import Tax from '../../../../models/tax/Tax';
import { IDeleter } from '../../../../types/interfaces/DatabaseAPI';

class TaxDeleter implements IDeleter<Tax> {
	public async delete(id: number): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id });
		if (tax) {
			tax.isDeleted = true;
			await Tax.save(tax);
	
			return tax;
		}
		else throw new NotFoundException(`Can't find tax with id = ${id}`);
	}
}

export default new TaxDeleter();
