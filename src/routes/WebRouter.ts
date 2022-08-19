import { Router } from 'express';
import LoginController from '../controllers/auth/LoginController';
import IndexController from '../controllers/IndexController';

const webRouter: Router = Router();

webRouter.get('/', IndexController.get);
webRouter.get('/login', LoginController.get);

export default webRouter;
