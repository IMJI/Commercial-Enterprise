import { Request, Response, NextFunction } from "express";
import IService from "./IService";

abstract class Controller {
    protected name: string;
	protected service: IService;

	constructor(name: string, service: IService) {
		this.name = name;
		this.service = service;
	}

    public async get(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        res.status(405).send("Method not allowed");
    }

    public async post(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        res.status(405).send("Method not allowed");
    }

    public async put(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        res.status(405).send("Method not allowed");
    }

    public async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
        res.status(405).send("Method not allowed");
    }
}

export default Controller;