import { Equal, In } from "typeorm";
import Database from "../Database";
import AuthException from "../exceptions/AuthException";
import ForbiddenException from "../exceptions/ForbiddenException";
import Manager from "../models/manager/Manager";
import Outgoing from "../models/outgoing/Outgoing";
import OutgoingDTO from "../models/outgoing/OutgoingDTO";
import OutgoingFindOptions from "../models/outgoing/OutgoingFindOptions";
import OutgoingMapper from "../models/outgoing/OutgoingMapper";
import OutgoingQueryBuilder from "../models/outgoing/OutgoingQueryBuilder";
import Product from "../models/product/Product";
import User from "../models/user/User";
import DeleteResult from "../types/dto/DeleteResult";
import ReadAndCountResult from "../types/dto/ReadAndCountResult";
import IService from "../types/interfaces/IService";

class OutgoingService /*implements IService<Outgoing>*/ {
    public async findOne(id: number, managerId: number): Promise<Outgoing> {
        const result = await Outgoing.findOne({
            where: { id },
            relations: ['product', 'tax', 'manager', 'statuses', 'manager.parent', 'product.category']
        });
        if (result.manager.id !== managerId) throw new ForbiddenException(`You don't have access to this data`);
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
    public async findAndCount(options: OutgoingFindOptions, managerId: number): Promise<ReadAndCountResult<Outgoing>> {
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
                manager: Equal(managerId)
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
        
        return outgoing;
    }
    public async update(dto: object): Promise<Outgoing> {
        throw new Error("Method not implemented.");
    }
    public async delete(id: number): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
}

export default new OutgoingService();