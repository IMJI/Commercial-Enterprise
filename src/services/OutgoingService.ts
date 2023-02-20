import { Equal, In } from "typeorm";
import EntityCreationException from "../exceptions/EntityCreationException";
import ForbiddenException from "../exceptions/ForbiddenException";
import NotFoundException from "../exceptions/NotFoundException";
import Manager from "../models/manager/Manager";
import Outgoing from "../models/outgoing/Outgoing";
import OutgoingDTO from "../models/outgoing/OutgoingDTO";
import OutgoingFindOptions from "../models/outgoing/OutgoingFindOptions";
import OutgoingMapper from "../models/outgoing/OutgoingMapper";
import OutgoingQueryBuilder from "../models/outgoing/OutgoingQueryBuilder";
import DeleteResult from "../types/dto/DeleteResult";
import ReadAndCountResult from "../types/dto/ReadAndCountResult";
import IService from "../types/interfaces/IService";
import StatusService from "./StatusService";

class OutgoingService /*implements IService<Outgoing>*/ {
    public async findOne(id: number, manager: Manager): Promise<Outgoing> {
        const result = await Outgoing.findOne({
            where: { id },
            relations: ['product', 'tax', 'manager', 'statuses', 'manager.parent', 'product.category']
        });
        if (!this.checkAccess(manager, result)) throw new ForbiddenException(`You don't have access to this data`);
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
    public async findAndCount(options: OutgoingFindOptions, manager: Manager): Promise<ReadAndCountResult<Outgoing>> {
        // const opts: OutgoingFindOptions = { ...options };
		// const builder = new OutgoingQueryBuilder('outgoing');
		// const query = builder.build(opts);
        // const rows = await query.getMany();
		// const count = await query.getCount();

		// return { rows, count };
        const query = await Outgoing.findAndCount({
            where: {
                tax: options.taxes && options.taxes.length > 0
                    ? In(options.taxes)
                    : true,
                manager: Equal(manager.id)
            },
            relations: ['product', 'product.category', 'tax', 'manager', 'statuses']
        })
        const rows = query[0];
		const count = query[1];

		return { rows, count };          
    }
    public async create(dto: OutgoingDTO, manager: Manager): Promise<Outgoing> {
        const outgoing = await OutgoingMapper.toDomain(dto);
        outgoing.manager = manager;
        await Outgoing.save(outgoing);
        const status = await StatusService.create({ outgoing, status: 'Created' });
        if (!status) throw new EntityCreationException(`Can't create status for outgoing`);
        
        return outgoing;
    }

    public async update(dto: OutgoingDTO, manager: Manager): Promise<Outgoing> {
        const outgoing = await Outgoing.findOne({ where: { id: dto.id }, relations: ['manager']});
        if (!outgoing) throw new NotFoundException(`Can't find outgoing with id = ${dto.id}`);
        if (!this.checkAccess(manager, outgoing)) throw new ForbiddenException(`You don't have access to this data`);
        if (dto.status) {
            const status = await StatusService.update({ outgoing, status: dto.status });
            if (!status) throw new EntityCreationException(`Can't create status for outgoing`);
        }
        
        return outgoing;
    }

    public async delete(id: number, manager: Manager): Promise<DeleteResult> {
        const outgoing = await Outgoing.findOne({ where: { id }, relations: ['manager']});
        if (!outgoing) throw new NotFoundException(`Can't find outgoing with id = ${id}`);
        if (!this.checkAccess(manager, outgoing)) throw new ForbiddenException(`You don't have access to this data`);
        const status = StatusService.cancel(outgoing);
        if (!status) throw new EntityCreationException(`Can't create new status for outgoing with id = ${id}`);

        return {
            id,
            date: new Date(),
            success: true
        }
    }

    private checkAccess(manager: Manager, outgoing: Outgoing): boolean {
        return manager.id === outgoing.manager.id;
    }
}

export default new OutgoingService();