import ManagerService from "../../services/ManagerService";
import ProductService from "../../services/ProductService";
import TaxService from "../../services/TaxService";
import Outgoing from "./Outgoing";
import OutgoingDTO from "./OutgoingDTO";

class OutgoingMapper {
	public static async toDomain(dto: OutgoingDTO): Promise<Outgoing> {
		const outgoing = new Outgoing();
        if (dto.id) outgoing.id = dto.id;
        if (dto.product) outgoing.product = await ProductService.findOne(dto.product);
        if (dto.tax) outgoing.tax = await TaxService.findOne(dto.tax);
        if (dto.manager) outgoing.manager = await ManagerService.findOne(dto.manager);
        if (dto.quantity) {
            outgoing.quantity = dto.quantity;
            outgoing.cost = +(1099.99 * dto.quantity).toFixed(2);
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
