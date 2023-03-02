import Status from './Status';
import StatusDTO from './StatusDTO';

class StatusMapper {
	public static toDomain(dto: StatusDTO): Status {
		const status = new Status();
		if (dto.outgoing) {
			status.outgoing = dto.outgoing;
			status.outgoingId = dto.outgoing.id;
		}
		if (dto.dateFrom) status.dateFrom = dto.dateFrom;
		else status.dateFrom = new Date();
		if (dto.dateTo) status.dateTo = dto.dateTo;
		if (dto.status) status.status = dto.status;

		return status;
	}
}

export default StatusMapper;
