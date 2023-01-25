import { Request, Response, NextFunction } from 'express';
import IService from '../types/interfaces/IService';

abstract class Controller<T> {
	protected name: string;
	protected service: IService<T>;

	constructor(name: string, service: IService<T>) {
		this.name = name;
		this.service = service;
	}

	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(405).send('Method not allowed');
	}

	public async post(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(405).send('Method not allowed');
	}

	public async put(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(405).send('Method not allowed');
	}

	public async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(405).send('Method not allowed');
	}
}

export default Controller;
