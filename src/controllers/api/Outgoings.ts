import { Request, Response, NextFunction } from 'express';
import Outgoing from '../../models/Outgoing';
import Database from '../../services/Database';
import { Query } from '../../services/utils/Web';

interface OutgoingQuery extends Query {
	cost?: string;
	quantity?: string;
	vendorCode?: string;
	manager?: string;
	category?: string;
	tax?: string;
}

type OutgoingParams = {
	id: string;
};

class OutgoingsController {
	public static async get(req: Request<OutgoingParams, unknown, unknown, OutgoingQuery>, res: Response, next: NextFunction): Promise<void> {
		// try {
		// 	const context: OutgoingQuery = {};
		// 	if (req.params.id) context.id = req.params.id;
		// 	if (req.query.skip) context.skip = req.query.skip;
		// 	if (req.query.limit) context.limit = req.query.limit;
		// 	// if (req.query.sort) context.sort = Sort.FromString(req.query.sort);
		// 	if (req.query.vendorCode) context.vendorCode = req.query.vendorCode;
		// 	if (req.query.manager) context.manager = req.query.manager;
		// 	if (req.query.category) context.category = req.query.category;
		// 	if (req.query.tax) context.tax = req.query.tax;
		// 	if (req.query.cost) context.cost = req.query.cost;
		// 	if (req.query.quantity) context.quantity = req.query.quantity;

		// 	const rows = await Outgoings.Find(context);
		// 	if (req.params.id) {
		// 		if (rows.length === 1) {
		// 			res.status(200).json(rows[0]);
		// 		} else {
		// 			res.status(404).end();
		// 		}
		// 	} else {
		// 		const count = await Outgoings.Count(context);
		// 		res.status(200).json({ rows: rows, count: count });
		// 	}
		// } catch (err) {
		// 	next(err);
		// }
		const dataSource = Database.dataSource;
		const data = await dataSource
			.getRepository(Outgoing)
			.createQueryBuilder('outgoing')
			.leftJoinAndSelect('outgoing.tax', 'tax')
			.leftJoinAndSelect('outgoing.manager', 'manager')
			.leftJoinAndSelect('outgoing.product', 'product')
			.where('outgoing.id = :id', { id: 1 })
			.getOne()
			.catch((err) => console.log(err))
		res.status(200).json(data);
	}

	// public static async Post(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }

	// public static async Put(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }

	// public static async Delete(req : Request, res : Response, next : NextFunction) : Promise<void> {

	// }
}

export default OutgoingsController;
export { OutgoingsController, OutgoingQuery };
