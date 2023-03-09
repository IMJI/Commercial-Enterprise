import {
	Any,
	Between,
	Equal,
	FindManyOptions,
	FindOptionsOrder,
	FindOptionsOrderValue,
	In,
	IsNull,
	LessThanOrEqual,
	MoreThanOrEqual,
	Not
} from 'typeorm';
import Database from '../Database';
import EntityCreationException from '../exceptions/EntityCreationException';
import ForbiddenException from '../exceptions/ForbiddenException';
import NotFoundException from '../exceptions/NotFoundException';
import StockException from '../exceptions/StockException';
import Manager from '../models/manager/Manager';
import Outgoing from '../models/outgoing/Outgoing';
import OutgoingDTO from '../models/outgoing/OutgoingDTO';
import OutgoingFindOptions from '../models/outgoing/OutgoingFindOptions';
import OutgoingMapper from '../models/outgoing/OutgoingMapper';
import OutgoingQueryBuilder from '../models/outgoing/OutgoingQueryBuilder';
import DeleteResult from '../types/dto/DeleteResult';
import ReadAndCountResult from '../types/dto/ReadAndCountResult';
import IService from '../types/interfaces/IService';
import { toArray } from '../utils/Utils';
import StatusService from './StatusService';
import StockService from './StockService';

class OutgoingService /*implements IService<Outgoing>*/ {
	public async findOne(id: number, manager: Manager): Promise<Outgoing> {
		const result = await Outgoing.findOne({
			where: { id },
			relations: [
				'product',
				'tax',
				'manager',
				'statuses',
				'manager.parent',
				'product.category'
			]
		});
		if (!this.checkAccess(manager, result))
			throw new ForbiddenException(`You don't have access to this data`);
		return result;
	}
	public async find(options: OutgoingFindOptions): Promise<Outgoing[]> {
		const opts: OutgoingFindOptions = { ...options };
		const builder = new OutgoingQueryBuilder('outgoing');
		const query = builder.build(opts);
		const result = await query.getMany();

		return result;
	}
	public async count(options: OutgoingFindOptions): Promise<number> {
		const opts: OutgoingFindOptions = { ...options };
		const builder = new OutgoingQueryBuilder('outgoing');
		const query = builder.build(opts);
		const result = await query.getCount();

		return result;
	}
	public async findAndCount(
		options: OutgoingFindOptions,
		manager: Manager
	): Promise<ReadAndCountResult<Outgoing>> {
		const query: FindManyOptions<Outgoing> = {
			relations: ['product', 'product.category', 'tax', 'manager', 'statuses']
		};
		const whereOptions = {
			manager: Equal(manager.id)
		};
		if (options.taxes) {
			const taxes = toArray<number>(options.taxes);
			if (taxes.length > 0)
				whereOptions['tax'] = {
					id: In(taxes)
				};
		}

		if (options.products) {
			const products = toArray<number>(options.products);
			if (products.length > 0)
				whereOptions['product'] = {
					vendorCode: In(products)
				};
		}
		// if (options.costFrom && options.costTo) whereOptions['cost'] = Between(options.costFrom, options.costTo);
		// if (options.quantityFrom && options.quantityTo) whereOptions['quantity'] = Between(options.quantityFrom, options.quantityTo);
		query.where = whereOptions;
		if (options.limit) query.take = options.limit;
		if (options.skip) query.skip = options.skip;
		if (options.sort) {
			console.log(this.getOrderBy(options.sort));
			query.order = this.getOrderBy(options.sort);
		}

		const outgoings = await Outgoing.findAndCount(query);
		const rows = outgoings[0];
		const count = outgoings[1];

		return { rows, count };
	}

	public async getCostRange(manager: Manager) {
		// const query = Database.dataSource
		// 	.getRepository(Outgoing)
		// 	.createQueryBuilder("outgoing");
		// query.select("MAX(outgoing.cost)", "max");
		// query.where('outgoing.manager.')
		// const max = await query.getRawOne();
		// query.select("MIN(outgoing.cost)", "min");
		// const min = await query.getRawOne();
		// return [min.min, max.max];
	}

	public async create(dto: OutgoingDTO, manager: Manager): Promise<Outgoing> {
		const stock = await StockService.findOne(dto.product);
		if (dto.quantity > stock.quantity)
			throw new StockException(`Not enought items to sell`);
		const outgoing = await OutgoingMapper.toDomain(dto);
		outgoing.manager = manager;
		const updatedStock = await StockService.update({
			id: dto.product,
			quantity: -dto.quantity
		});
		if (!updatedStock) throw new StockException(`Can't update stock`);
		await Outgoing.save(outgoing);
		const status = await StatusService.create({ outgoing, status: 'Created' });
		if (!status)
			throw new EntityCreationException(`Can't create status for outgoing`);

		return outgoing;
	}

	public async update(dto: OutgoingDTO, manager: Manager): Promise<Outgoing> {
		const outgoing = await Outgoing.findOne({
			where: { id: dto.id },
			relations: ['manager']
		});
		if (!outgoing)
			throw new NotFoundException(`Can't find outgoing with id = ${dto.id}`);
		if (!this.checkAccess(manager, outgoing))
			throw new ForbiddenException(`You don't have access to this data`);
		if (dto.status) {
			const status = await StatusService.update({
				outgoing,
				status: dto.status
			});
			if (!status)
				throw new EntityCreationException(`Can't create status for outgoing`);
		}

		return outgoing;
	}

	public async delete(id: number, manager: Manager): Promise<DeleteResult> {
		const outgoing = await Outgoing.findOne({
			where: { id },
			relations: ['manager']
		});
		if (!outgoing)
			throw new NotFoundException(`Can't find outgoing with id = ${id}`);
		if (!this.checkAccess(manager, outgoing))
			throw new ForbiddenException(`You don't have access to this data`);
		const status = StatusService.cancel(outgoing);
		if (!status)
			throw new EntityCreationException(
				`Can't create new status for outgoing with id = ${id}`
			);

		return {
			id,
			date: new Date(),
			success: true
		};
	}

	private checkAccess(manager: Manager, outgoing: Outgoing): boolean {
		return manager.id === outgoing.manager.id;
	}

	private getOrderBy(sort: string): FindOptionsOrder<Outgoing> {
		const [orderBy, order] = sort.split(':');
		const orderValue: FindOptionsOrderValue = {
			direction: order as 'ASC' | 'DESC' | 'asc' | 'desc'
		};
		if (orderBy === 'product') {
			return {
				product: {
					name: orderValue
				}
			};
		}
		if (orderBy === 'tax') {
			return {
				tax: {
					value: orderValue,
					name: orderValue
				}
			};
		}
		if (orderBy === 'date') {
			return {
				date: orderValue
			};
		}
		if (orderBy === 'quantity') {
			return {
				quantity: orderValue
			};
		}
		if (orderBy === 'cost') {
			return {
				cost: orderValue
			};
		}
		return null;
	}
}

export default new OutgoingService();
