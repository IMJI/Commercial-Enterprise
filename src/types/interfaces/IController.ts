import { Request, Response, NextFunction } from 'express';

interface IController {
	get(req: Request, res: Response, next: NextFunction): void;
	post(req: Request, res: Response, next: NextFunction): void;
	put(req: Request, res: Response, next: NextFunction): void;
	delete(req: Request, res: Response, next: NextFunction): void;
}

export default IController;
