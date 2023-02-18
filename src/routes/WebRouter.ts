import { Router } from 'express';
import LoginController from '../controllers/auth/LoginController';
import HealthCheckController from '../controllers/HealthCheckController';
import IndexController from '../controllers/IndexController';

const webRouter: Router = Router();
const loginController = new LoginController('login');
const healthCheckController = new HealthCheckController('health');

webRouter.get('/', IndexController.get);
webRouter
	.get('/login', loginController.get)
	.post('/login', loginController.post);
webRouter.get('/health', healthCheckController.get);

export default webRouter;
