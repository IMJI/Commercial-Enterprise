import StockException from '../exceptions/StockException';
import Stock from '../models/stock/Stock';
import StockDTO from '../models/stock/StockDTO';
import StockMapper from '../models/stock/StockMapper';
import DeleteResult from '../types/dto/DeleteResult';
import FindOptions from '../types/dto/FindOptions';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';

class StockService implements IService<Stock> {
	public async findOne(id: number): Promise<Stock> {
		// Find stock by produvt vendor code
		const stock = await Stock.findOne({
			where: { productVendorCode: id },
			relations: ['product']
		});
		return stock;
	}
	public async find(options: FindOptions): Promise<Stock[]> {
		// Return all products in stock
		const stocks = await Stock.find({ relations: ['product'] });
		return stocks;
	}
	public async count(options: FindOptions): Promise<number> {
		const stocks = await Stock.count();
		return stocks;
	}
	public async findAndCount(
		options: FindOptions
	): Promise<ReadAndCountResult<Stock>> {
		const rows = await Stock.find({ relations: ['product'] });
		const count = await Stock.count();
		return { rows, count };
	}
	public async create(dto: StockDTO): Promise<Stock> {
		// Create new stock entity. Used when product firstly created
		dto.quantity = 0;
		const stock = await StockMapper.toDomain(dto);
		await Stock.save(stock);

		return stock;
	}
	public async update(dto: StockDTO): Promise<Stock> {
		const stock = await Stock.findOne({
			where: { productVendorCode: dto.id },
			relations: ['product']
		});
		if (stock.quantity + dto.quantity >= 0) stock.quantity += dto.quantity;
		else throw new StockException(`Not enought ${stock.product.name} in stock`);
		await Stock.save(stock);

		return stock;
	}
	public async delete(id: number): Promise<DeleteResult> {
		// Permanently remove stock entity if there are 0 products in stock
        // throw new Error('Not implemented');
		const stock = await Stock.findOneBy({ productVendorCode: id });
        if (stock.quantity > 0) throw new StockException(`Can't delete while product in stock`);
		await Stock.delete(stock.productVendorCode);

		return {
			id,
			success: true,
			date: new Date()
		};
	}
}

export default new StockService();
