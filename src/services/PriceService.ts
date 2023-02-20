import { LessThanOrEqual, MoreThan } from 'typeorm';
import NotFoundException from '../exceptions/NotFoundException';
import { Price } from '../models/Models';
import PriceDTO from '../models/price/PriceDTO';
import PriceFindOptions from '../models/price/PriceFindOptions';
import PriceMapper from '../models/price/PriceMapper';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';

class PriceService {
	public async findOne(productId: number, date: Date): Promise<Price> {
		const result = await Price.find({
			where: [
				{
					productId,
					dateFrom: LessThanOrEqual(date),
					dateTo: MoreThan(date)
				},
				{
					productId,
					dateFrom: LessThanOrEqual(date),
					dateTo: null
				}
			],
			relations: {
				product: true
			}
		});
		if (result.length !== 1)
			throw new NotFoundException(`Can't find price by your query`);

		return result[0];
	}

	public async findLatest(productId: number): Promise<Price> {
		const result = await Price.findOneBy({ productId, dateTo: null });
		return result;
	}

	// public async find(options: PriceFindOptions): Promise<Price[]> {

	// }

	// public async count(options: PriceFindOptions): Promise<number> {

	// }

	// public async findAndCount(
	// 	options: PriceFindOptions
	// ): Promise<ReadAndCountResult<Price>> {

	// }

	public async create(dto: PriceDTO): Promise<Price> {
		const lastPrice = await this.findLatest(dto.productId);
		const now = new Date();
		lastPrice.dateTo = now;
		Price.save(lastPrice);
		const price = PriceMapper.toDomain(dto);
		price.dateFrom = now;
		Price.save(price);

		return price;
	}
}

export default PriceService;
