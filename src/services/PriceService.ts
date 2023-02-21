import { IsNull, LessThanOrEqual, MoreThan } from 'typeorm';
import EntityUpdatingException from '../exceptions/EntityUpdatingException';
import NotFoundException from '../exceptions/NotFoundException';
import Price from '../models/price/Price';
import PriceDTO from '../models/price/PriceDTO';
import PriceMapper from '../models/price/PriceMapper';
import TimestampService from './TimestampService';

class PriceService extends TimestampService<Price> {
	public async findLatest(parentId: number): Promise<Price> {
		const result = await Price.findOne({
            where: {
                productId: parentId,
                dateTo: IsNull()
            }
        });
        return result;
	}
	public async findActualOn(parentId: number, date: Date): Promise<Price> {
		const result = await Price.findOne({
            where: [
                {
                    productId: parentId,
                    dateFrom: LessThanOrEqual(date),
                    dateTo: MoreThan(date)
                },
                {
                    productId: parentId,
                    dateFrom: LessThanOrEqual(date),
                    dateTo: IsNull()
                }
            ]
        });
        return result;
	}
	public async findAll(parentId: number): Promise<Price[]> {
		const result = await Price.find({
            where: {
                productId: parentId
            }
        });
        return result;
	}
	public async create(dto: PriceDTO): Promise<Price> {
		const now = new Date();
		dto.dateFrom = now;
		const price = PriceMapper.toDomain(dto);
		await Price.save(price);

		return price;
	}
	public async update(dto: PriceDTO): Promise<Price> {
		const now = new Date();
		const previous = await this.closePrevious(dto.productId, now);
		if (!previous.dateTo) throw new EntityUpdatingException(`Can't close latest price of product with id = ${dto.productId}`);
		dto.dateFrom = now;
        const price = PriceMapper.toDomain(dto);
        await Price.save(price);

        return price;
	}
	protected async closePrevious(parentId: number, date: Date): Promise<Price> {
		const previous = await this.findLatest(parentId);
		if (!previous) throw new NotFoundException(`Can't find latest price for product with id = ${parentId}`);
		previous.dateTo = date;
		await Price.save(previous);

		return previous;
	}
	
	// public async findOne(productId: number, date: Date): Promise<Price> {
	// 	const result = await Price.find({
	// 		where: [
	// 			{
	// 				productId,
	// 				dateFrom: LessThanOrEqual(date),
	// 				dateTo: MoreThan(date)
	// 			},
	// 			{
	// 				productId,
	// 				dateFrom: LessThanOrEqual(date),
	// 				dateTo: null
	// 			}
	// 		],
	// 		relations: {
	// 			product: true
	// 		}
	// 	});
	// 	if (result.length !== 1)
	// 		throw new NotFoundException(`Can't find price by your query`);

	// 	return result[0];
	// }

	// public async findLatest(productId: number): Promise<Price> {
	// 	const result = await Price.findOneBy({ productId, dateTo: null });
	// 	return result;
	// }

	// // public async find(options: PriceFindOptions): Promise<Price[]> {

	// // }

	// // public async count(options: PriceFindOptions): Promise<number> {

	// // }

	// // public async findAndCount(
	// // 	options: PriceFindOptions
	// // ): Promise<ReadAndCountResult<Price>> {

	// // }

	// public async create(dto: PriceDTO): Promise<Price> {
	// 	const lastPrice = await this.findLatest(dto.productId);
	// 	const now = new Date();
	// 	lastPrice.dateTo = now;
	// 	Price.save(lastPrice);
	// 	const price = PriceMapper.toDomain(dto);
	// 	price.dateFrom = now;
	// 	Price.save(price);

	// 	return price;
	// }
}

export default PriceService;
