import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

class LoginController {
    public static Get(req : Request, res : Response, next : NextFunction) : void {
        res.sendFile(path.join(__dirname + '/../../pages/index.html'));
    }

    public static Post(req : Request, res : Response, next : NextFunction) : void {
        
    }
}

export default LoginController;