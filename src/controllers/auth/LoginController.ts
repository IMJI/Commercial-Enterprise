import { Request, Response, NextFunction } from 'express';
import Routes from '../../services/Routes';

class LoginController {
    public static Get(req : Request, res : Response, next : NextFunction) : void {
        res.sendFile(Routes['login']);
    }

    public static Post(req : Request, res : Response, next : NextFunction) : void {
        
    }
}

export default LoginController;