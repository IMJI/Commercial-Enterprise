import { Router } from 'express';
import taxRouter from './api/TaxRouter';
import categoryRouter from './api/CategoryRouter';
import managerRouter from './api/ManagerRouter';
import productRouter from './api/ProductRouter';
import userRouter from './api/UserRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter
	.use(apiPath, taxRouter)
	.use(apiPath, categoryRouter)
	.use(apiPath, managerRouter)
	.use(apiPath, productRouter)
	.use(apiPath, userRouter);

export default apiRouter;
