import { Router } from 'express';
import { taxUserRouter, taxAdminRouter } from './api/TaxRouter';
import { categoryUserRouter, categoryAdminRouter } from './api/CategoryRouter';
import { managerAdminRouter, managerUserRouter } from './api/ManagerRouter';
import { productAdminRouter, productUserRouter } from './api/ProductRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter
	.use(apiPath, taxUserRouter)
	.use(apiPath, taxAdminRouter)
	.use(apiPath, categoryUserRouter)
	.use(apiPath, categoryAdminRouter)
	.use(apiPath, managerUserRouter)
	.use(apiPath, managerAdminRouter)
	.use(apiPath, productUserRouter)
	.use(apiPath, productAdminRouter);

export default apiRouter;
