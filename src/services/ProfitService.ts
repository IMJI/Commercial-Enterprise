import { Equal, IsNull } from 'typeorm';
import Database from '../Database';
import Outgoing from '../models/outgoing/Outgoing';
import Profit from '../models/Profit';
import { CurrentMonth } from '../utils/Utils';
import ManagerService from './ManagerService';
import OutgoingService from './OutgoingService';
import TimestampService from './TimestampService';

class ProfitService extends TimestampService<Profit> {
	public async findLatest(parentId: number): Promise<Profit> {
		return this.findActualOn(parentId, new Date());
	}

	public async findActualOn(parentId: number, date: Date): Promise<Profit> {
		const outgoings = await Outgoing.find({
			where: {
				manager: {
					id: Equal(parentId)
				},
				statuses: {
					dateFrom: CurrentMonth(date),
					dateTo: IsNull(),
					status: Equal('Shipped')
				}
			},
			relations: ['manager', 'statuses']
		});
		const manager = await ManagerService.findOne(parentId);
		const profit = new Profit();
		const sum = outgoings.reduce(
			(partialSum, outgoing) => partialSum + +outgoing.cost,
			0
		);
		profit.profit = +(sum * manager.percent).toFixed(2);
		profit.manager = manager;
		profit.managerId = parentId;

		return profit;
	}

	public async findAll(parentId: number): Promise<Profit[]> {
		const result = [];
		const date = new Date();
		for (let i = 0; i < 12; i++) {
			if (i > 0) date.setMonth(date.getMonth() - 1);
			const profit = await this.findActualOn(parentId, date);
			result.push(profit);
		}

		return result;
	}
	public create(dto: object): Promise<Profit> {
		throw new Error('Method not implemented.');
	}
	public update(dto: object): Promise<Profit> {
		throw new Error('Method not implemented.');
	}
	protected closePrevious(parentId: number, date: Date): Promise<Profit> {
		throw new Error('Method not implemented.');
	}
}

export default new ProfitService('profit');
