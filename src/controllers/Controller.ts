import { Request, Response, NextFunction } from 'express';

abstract class Controller {
	protected name: string;

	constructor(name: string) {
		this.name = name;
	}

	public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(404).send('Not found');
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
