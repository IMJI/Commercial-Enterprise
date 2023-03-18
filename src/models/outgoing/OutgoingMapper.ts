import ManagerService from '../../services/ManagerService';
import PriceService from '../../services/PriceService';
import ProductService from '../../services/ProductService';
import TaxService from '../../services/TaxService';
import Price from '../price/Price';
import Tax from '../tax/Tax';
import Outgoing from './Outgoing';
import OutgoingDTO from './OutgoingDTO';

class OutgoingMapper {
	public static async toDomain(dto: OutgoingDTO): Promise<Outgoing> {
		const outgoing = new Outgoing();
		let price: Price = null;
		let tax: Tax = null;
		if (dto.id) outgoing.id = dto.id;
		if (dto.tax) {
			tax = await TaxService.findOne(dto.tax);
			outgoing.tax = tax;
		}
		if (dto.product) {
			outgoing.product = await ProductService.findOne(dto.product);
			price = await PriceService.findLatest(dto.product);
		}
		if (dto.manager)
			outgoing.manager = await ManagerService.findOne(dto.manager);

		if (dto.quantity) {
			outgoing.quantity = dto.quantity;
			if (price) outgoing.cost = +(price.value * dto.quantity * (tax ? 1 - tax.value : 1)).toFixed(2);
		}

		return outgoing;
	}

	public static toDTO(domain: Outgoing): OutgoingDTO {
		const dto = new OutgoingDTO();
		// TODO: Implement OutgoingMapper.toDTO()
		return dto;
	}
}

export default OutgoingMapper;
