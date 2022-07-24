import { Request, Response, NextFunction } from 'express';
import Outgoings from '../../db_apis/Outgoings';
import { Query } from '../../services/utils/Web';

interface OutgoingQuery extends Query {
    cost? : number;
    quantity? : number;
    vendor_code? : number;
    manager? : number;
    category? : string;
    tax? : string;
}

class OutgoingsController {
    public static async Get(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const context : OutgoingQuery = {};
            if (req.params.id) context.id = +req.params.id;
            const rows = await Outgoings.Find(context);
            if (req.params.id) {
                if (rows.length === 1) {
                    res.status(200).json(rows[0]);
                } else {
                    res.status(404).end();
                }
            } else {
                res.status(200).json(rows);
            }
        } catch(err) {
            next(err);
        }
    }

    public static async Post(req : Request, res : Response, next : NextFunction) : Promise<void> {

    }

    public static async Put(req : Request, res : Response, next : NextFunction) : Promise<void> {

    }

    public static async Delete(req : Request, res : Response, next : NextFunction) : Promise<void> {

    }
}

export default OutgoingsController;
export { OutgoingsController, OutgoingQuery }