import { Request, Response, NextFunction } from 'express';
import Routes from '../services/Routes';

class IndexController {
    public static Get(req : Request, res : Response, next : NextFunction) : void {
        res.sendFile(Routes['index']);
    }
}

export default IndexController;