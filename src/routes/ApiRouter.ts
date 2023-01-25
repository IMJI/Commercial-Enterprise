import { Router } from 'express';
import taxRouter from './api/TaxRouter';
import categoryRouter from './api/CategoryRouter';
import managerRouter from './api/ManagerRouter';
import productRouter from './api/ProductRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter
	.use(apiPath, taxRouter)
	.use(apiPath, categoryRouter)
	.use(apiPath, managerRouter)
	.use(apiPath, productRouter);

export default apiRouter;
