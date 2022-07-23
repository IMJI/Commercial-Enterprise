import { Request, Response, NextFunction } from 'express';

class OutgoingsController {
    public static async Get(req : Request, res : Response, next : NextFunction) : Promise<void> {
        try {
            res.status(200).send('Outgoings Controller');
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