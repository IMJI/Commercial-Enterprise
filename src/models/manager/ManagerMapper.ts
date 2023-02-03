import ManagerService from '../../services/ManagerService';
import Manager from './Manager';
import ManagerDTO from './ManagerDTO';

class ManagerMapper {
	public static async toDomain(dto: ManagerDTO): Promise<Manager> {
		const manager = new Manager();
		if (dto.id) manager.id = dto.id;
		if (dto.percent) manager.percent = dto.percent;
		if (dto.hireDate) manager.hireDate = dto.hireDate;
		else manager.hireDate = new Date();
		if (dto.dismissalDate) manager.dismissalDate = dto.dismissalDate;
		if (dto.parent) manager.parent = await ManagerService.findOne(dto.parent);

		return manager;
	}

	public static toDTO(domain: Manager): ManagerDTO {
		const dto = new ManagerDTO();
		dto.id = domain.id;
		dto.percent = domain.percent;
		dto.hireDate = domain.hireDate;
		dto.dismissalDate = domain.dismissalDate;
		dto.parent = domain.parent.id;

		return dto;
	}
}

export default ManagerMapper;
