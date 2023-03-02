import { IsNull, LessThanOrEqual, MoreThan } from 'typeorm';
import EntityUpdatingException from '../exceptions/EntityUpdatingException';
import Exception from '../exceptions/Exception';
import NotFoundException from '../exceptions/NotFoundException';
import { Outgoing } from '../models/Models';
import Status from '../models/status/Status';
import StatusDTO from '../models/status/StatusDTO';
import StatusMapper from '../models/status/StatusMapper';
import TimestampService from './TimestampService';

class StatusService extends TimestampService<Status> {
	public async findLatest(parentId: number): Promise<Status> {
		const result = await Status.findOne({
			where: {
				outgoingId: parentId,
				dateTo: IsNull()
			}
		});
		return result;
	}

	public async findActualOn(parentId: number, date: Date): Promise<Status> {
		const result = await Status.findOne({
			where: [
				{
					outgoingId: parentId,
					dateFrom: LessThanOrEqual(date),
					dateTo: MoreThan(date)
				},
				{
					outgoingId: parentId,
					dateFrom: LessThanOrEqual(date),
					dateTo: IsNull()
				}
			]
		});
		return result;
	}

	public async findAll(parentId: number): Promise<Status[]> {
		const result = await Status.find({
			where: {
				outgoingId: parentId
			}
		});
		return result;
	}

	public async create(dto: StatusDTO): Promise<Status> {
		const now = new Date();
		dto.dateFrom = now;
		const status = StatusMapper.toDomain(dto);
		await Status.save(status);

		return status;
	}

	public async update(dto: StatusDTO): Promise<Status> {
		const now = new Date();
		const previous = await this.closePrevious(dto.outgoing.id, now);
		if (!previous.dateTo)
			throw new EntityUpdatingException(
				`Can't close latest status of outgoing with id = ${dto.outgoing.id}`
			);
		const status = StatusMapper.toDomain({
			outgoing: dto.outgoing,
			dateFrom: now,
			status: dto.status
		});
		await Status.save(status);

		return status;
	}

	public async cancel(outgoing: Outgoing): Promise<Status> {
		const now = new Date();
		const previous = await this.closePrevious(outgoing.id, now);
		if (!previous.dateTo)
			throw new EntityUpdatingException(
				`Can't close latest status of outgoing with id = ${outgoing.id}`
			);
		const status = StatusMapper.toDomain({
			outgoing,
			dateFrom: now,
			status: 'Canceled'
		});
		await Status.save(status);

		return status;
	}

	protected async closePrevious(
		outgoingId: number,
		date: Date
	): Promise<Status> {
		const previous = await this.findLatest(outgoingId);
		if (!previous)
			throw new NotFoundException(
				`Can't find latest status for outgoing with id = ${outgoingId}`
			);
		previous.dateTo = date;
		await Status.save(previous);

		return previous;
	}
}

export default new StatusService('status');
