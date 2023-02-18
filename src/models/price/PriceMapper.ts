import Price from './Price';
import PriceDTO from './PriceDTO';

class PriceMapper {
	public static toDomain(dto: PriceDTO): Price {
		const price = new Price();
		if (dto.productId) price.productId = dto.productId;
		if (dto.dateFrom) price.dateFrom = dto.dateFrom;
		if (dto.value) price.value = dto.value;

		return price;
	}

	public static toDTO(domain: Price): PriceDTO {
		const dto = new PriceDTO();
		dto.productId = domain.productId;
		dto.dateFrom = domain.dateFrom;
		dto.value = domain.value;

		return dto;
	}
}

export default PriceMapper;
