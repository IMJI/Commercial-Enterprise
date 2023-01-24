import Tax from '../../../models/tax/Tax';
import Logger from '../../../services/logger/Logger';
import FindOptions from '../../../types/dto/FindOptions';
import ReadAndCountResult from '../../../types/dto/ReadAndCountResult';
import BaseDTO from './BaseDTO';
import CreateTaxDTO from './CreateTaxDTO';
import DeleteResult from './DeleteResult';
import IService from './IService';
import TaxFindOptions from './TaxFindOptions';
import UpdateTaxDTO from './UpdateTaxDTO';

class TaxService implements IService {
	public async findOne<T = Tax>(id: number): Promise<T> {
		Logger.debug(`findOne: ${id}`);
		throw new Error('Not implemented');
	}

	public async find<T = Tax>(options: TaxFindOptions): Promise<T> {
		throw new Error('Not implemented');
	}

	public async count<T = Tax>(options: TaxFindOptions): Promise<number> {
		throw new Error('Not implemented');
	}

	public async findAndCount<T = Tax>(
		options: TaxFindOptions
	): Promise<ReadAndCountResult<T>> {
		Logger.debug(`find: ${options}`);
		throw new Error('Not implemented');
	}

	public async create<T = Tax>(dto: CreateTaxDTO): Promise<T> {
		Logger.debug(`find: ${dto}`);
		throw new Error('Not implemented');
	}

	public async update<T = Tax>(id: number, dto: UpdateTaxDTO): Promise<T> {
		Logger.debug(`find: ${dto}`);
		throw new Error('Not implemented');
	}

	public async delete(id: number): Promise<DeleteResult> {
		Logger.debug(`find: ${id}`);
		throw new Error('Not implemented');
	}
}

export default new TaxService();
