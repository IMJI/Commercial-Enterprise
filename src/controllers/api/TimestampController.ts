import { Request, Response, NextFunction } from "express";
import { BaseEntity } from "typeorm";
import EntityIsNotSpecifiedException from "../../exceptions/EntityIsNotSpecifiedException";
import NotFoundException from "../../exceptions/NotFoundException";
import TimestampService from "../../services/TimestampService";
import IService from '../../types/interfaces/IService';
import { isDate } from "../../utils/Utils";
import Controller from '../Controller';

abstract class ServiceController<T extends BaseEntity> extends Controller {
	protected service: Service<T>;

	constructor(name: string, service: Service<T>) {
		super(name);
		this.service = service;
	}
}

abstract class TimestampEntity extends BaseEntity {
    dateFrom: Date;
    dateTo: Date;
}

abstract class Service<T extends BaseEntity> {

}

class TimestampController<T extends TimestampEntity> extends ServiceController<T> {
    constructor(name: string, service: Service<T>) {
        super(name, service);
    }

    public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        try {
            const parentId = +req.params.id;
            if (!parentId) throw new EntityIsNotSpecifiedException(`Parent id is not specified`);
            const timestamp = req.params.timestamp;
            if (timestamp === 'latest') {
                const result = await (this.service as TimestampService<T>).findLatest(parentId);
                if (result) res.status(200).json(result);
                throw new NotFoundException(
                    `Can't find ${this.name} for parent entity with id = ${parentId}`
                );
            } else if (isDate(timestamp)) {
                const date = new Date(timestamp);
                const result = await (this.service as TimestampService<T>).findActualOn(parentId, date);
                if (result) res.status(200).json(result);
                throw new NotFoundException(
                    `Can't find ${this.name} for parent entity with id = ${parentId}`
                );
            } else if (!timestamp) {
                const result = await (this.service as TimestampService<T>).findAll(parentId);
                if (result && result.length > 0) res.status(200).json(result);
                throw new NotFoundException(
                    `Can't find ${this.name} for parent entity with id = ${parentId}`
                );
            }

        } catch (error) {
            next(error);
        }
    }
}

export default TimestampController;