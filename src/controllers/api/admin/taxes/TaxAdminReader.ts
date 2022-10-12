import Tax from '../../../../models/tax/Tax';
import TaxQueryBuilder from '../../../../models/tax/utils/TaxQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { ExtendedTaxFindOptions } from '../../../../models/tax/dto/TaxFindOptions';

class TaxAdminReader implements IReader<Tax> {
	public async readOne(id: number): Promise<Tax> {
		const result = await Tax.findOneBy({ id });
		return result;
	}

	public async read(options: ExtendedTaxFindOptions): Promise<Tax[]> {
		const opts: ExtendedTaxFindOptions = { ...options };
		const query = TaxQueryBuilder.buildExtended(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: ExtendedTaxFindOptions): Promise<number> {
		const opts: ExtendedTaxFindOptions = { ...options };
		const query = TaxQueryBuilder.buildExtended(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: ExtendedTaxFindOptions
	): Promise<ReadAndCountResult<Tax>> {
		const opts: ExtendedTaxFindOptions = { ...options };
		const query = TaxQueryBuilder.buildExtended(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new TaxAdminReader();
