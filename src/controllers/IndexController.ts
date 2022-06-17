import { Request, Response, NextFunction } from 'express';
import Pages from '../services/Pages';

class IndexController {
    public static Get(req : Request, res : Response, next : NextFunction) : void {
        res.sendFile(Pages['index']);
    }
}

export default IndexController;