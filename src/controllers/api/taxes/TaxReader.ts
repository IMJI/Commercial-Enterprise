import Tax from '../../../models/tax/Tax';
import TaxQueryBuilder from '../../../models/tax/utils/TaxQueryBuilder';
import { IReader } from '../../../types/interfaces/DatabaseAPI';
import TaxFindOptions from '../../../types/dto/FindOptions';

class TaxReader implements IReader<Tax> {
	public async readOne(id: number): Promise<Tax> {
		const result = await Tax.findOneBy({ id });
		return result;
	}

	public async read(options: TaxFindOptions): Promise<Tax[]> {
		const query = TaxQueryBuilder.build(options);
		const result = await query.getMany();
		return result;
	}

	public async count(options: TaxFindOptions): Promise<number> {
		const query = TaxQueryBuilder.build(options);
		const result = await query.getCount();
		return result;
	}
}

export default new TaxReader();
