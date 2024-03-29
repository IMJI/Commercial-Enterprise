import Tax from '../../../../models/tax/Tax';
import TaxQueryBuilder from '../../../../models/tax/utils/TaxQueryBuilder';
import { IReader } from '../../../../types/interfaces/DatabaseAPI';
import ReadAndCountResult from '../../../../types/dto/ReadAndCountResult';
import { TaxFindOptions } from '../../../../models/tax/dto/TaxFindOptions';

class TaxReader implements IReader<Tax> {
	public async readOne(id: number): Promise<Tax> {
		const result = await Tax.findOneBy({ id });
		if (result && result.isDeleted) return null;
		return result;
	}

	public async read(options: TaxFindOptions): Promise<Tax[]> {
		const opts: TaxFindOptions = { ...options };
		const query = TaxQueryBuilder.build(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: TaxFindOptions): Promise<number> {
		const opts: TaxFindOptions = { ...options };
		const query = TaxQueryBuilder.build(opts);
		const result = await query.getCount();
		return result;
	}

	public async readAndCount(
		options: TaxFindOptions
	): Promise<ReadAndCountResult<Tax>> {
		const opts: TaxFindOptions = { ...options };
		const query = TaxQueryBuilder.build(opts);
		const rows = await query.getMany();
		const count = await query.getCount();
		return { rows, count };
	}
}

export default new TaxReader();
