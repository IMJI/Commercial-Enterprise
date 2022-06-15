import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

class IndexController {
    public static Get(req : Request, res : Response, next : NextFunction) : void {
        res.sendFile(path.join(__dirname + '/../../pages/index.html'));
    }
}

export default IndexController;