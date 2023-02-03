import Tax from '../models/tax/Tax';
import TaxQueryBuilder from '../models/tax/TaxQueryBuilder';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import DeleteResult from '../types/dto/DeleteResult';
import IService from '../types/interfaces/IService';
import TaxFindOptions from '../models/tax/TaxFindOptions';
import NotFoundException from '../exceptions/NotFoundException';
import TaxDTO from '../models/tax/TaxDTO';
import TaxMapper from '../models/tax/TaxMapper';

class TaxService implements IService<Tax> {
	public async findOne(id: number): Promise<Tax> {
		const result = await Tax.findOneBy({ id });
		if (result && result.isDeleted) return null;
		return result;
	}

	public async find(options: TaxFindOptions): Promise<Tax[]> {
		const opts: TaxFindOptions = { ...options };
		const builder = new TaxQueryBuilder('tax');
		const query = builder.build(opts);
		const result = await query.getMany();
		return result;
	}

	public async count(options: TaxFindOptions): Promise<number> {
		const opts: TaxFindOptions = { ...options };
		const builder = new TaxQueryBuilder('tax');
		const query = builder.build(opts);
		const result = await query.getCount();
		return result;
	}

	public async findAndCount(
		options: TaxFindOptions
	): Promise<ReadAndCountResult<Tax>> {
		const opts: TaxFindOptions = { ...options };
		console.log(opts);
		const builder = new TaxQueryBuilder('tax');
		const query = builder.build(opts);

		const rows = await query.getMany();
		const count = await query.getCount();

		return { rows, count };
	}

	public async create(dto: TaxDTO): Promise<Tax> {
		const tax = TaxMapper.toDomain(dto);
		await Tax.save(tax);

		return tax;
	}

	public async update(dto: TaxDTO): Promise<Tax> {
		const tax: Tax = await Tax.findOneBy({ id: dto.id });
		if (tax && !tax.isDeleted) {
			if (dto.name) tax.name = dto.name;
			if (dto.value) tax.value = dto.value;
			await Tax.save(tax);

			return tax;
		} else throw new NotFoundException(`Can't find tax with id = ${dto.id}`);
	}

	public async delete(id: number): Promise<DeleteResult> {
		const tax: Tax = await Tax.findOneBy({ id });
		if (tax) {
			tax.isDeleted = true;
			await Tax.save(tax);

			return {
				id,
				date: new Date(),
				success: tax.isDeleted
			};
		} else throw new NotFoundException(`Can't find tax with id = ${id}`);
	}
}

export default new TaxService();
