import { Request, Response, NextFunction } from 'express';
import Outgoings from '../../db_apis/Outgoings';

class OutgoingsController {
    public static async Get(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            const context : object = {};
            const rows = await Outgoings.Find(context);
            res.status(200).json(rows);
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