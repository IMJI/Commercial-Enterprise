import { Router } from 'express';
import LoginController from '../controllers/auth/LoginController';
import IndexController from '../controllers/IndexController';
import NotFoundController from '../controllers/NotFoundController';

const webRouter: Router = Router();

webRouter.get('/', IndexController.get);
webRouter.get('/login', LoginController.get);
webRouter.get('*', NotFoundController.get);

export default webRouter;
