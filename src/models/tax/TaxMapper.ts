import Tax from './Tax';
import TaxDTO from './TaxDTO';

class TaxMapper {
	public static toDomain(dto: TaxDTO): Tax {
		const tax = new Tax();
		if (dto.id) tax.id = dto.id;
		if (dto.name) tax.name = dto.name;
		if (dto.value) tax.value = dto.value;
		tax.isDeleted = false;

		return tax;
	}

	public static toDTO(domain: Tax): TaxDTO {
		const dto = new TaxDTO();
		dto.id = domain.id;
		dto.name = domain.name;
		dto.value = domain.value;

		return dto;
	}
}

export default TaxMapper;
