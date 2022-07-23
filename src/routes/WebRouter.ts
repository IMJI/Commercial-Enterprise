import { Router } from 'express';
import LoginController from '../controllers/auth/LoginController';
import IndexController from '../controllers/IndexController';

const WebRouter : Router = Router();

WebRouter.get('/', IndexController.Get);
WebRouter.get('/login', LoginController.Get);

export default WebRouter;