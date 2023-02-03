import { Router } from 'express';
import LoginController from '../controllers/auth/LoginController';
import IndexController from '../controllers/IndexController';

const webRouter: Router = Router();
const loginController = new LoginController('login');

webRouter.get('/', IndexController.get);
webRouter
	.get('/login', loginController.get)
	.post('/login', loginController.post);

export default webRouter;
