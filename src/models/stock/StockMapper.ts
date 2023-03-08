import ProductService from '../../services/ProductService';
import Stock from './Stock';
import StockDTO from './StockDTO';

class StockMapper {
	public static async toDomain(dto: StockDTO): Promise<Stock> {
		const stock = new Stock();
		if (dto.id) {
			stock.product = await ProductService.findOne(dto.id);
			stock.productVendorCode = dto.id;
		}
		if (dto.quantity) stock.quantity = dto.quantity;
		else stock.quantity = 0;
		console.log(stock)

		return stock;
	}
}

export default StockMapper;
