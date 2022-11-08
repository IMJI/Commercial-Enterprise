import { Router } from 'express';
import { taxUserRouter, taxAdminRouter } from './api/TaxRouter';
import { categoryUserRouter, categoryAdminRouter } from './api/CategoryRouter';
import { managerAdminRouter, managerUserRouter } from './api/ManagerRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter
	.use(apiPath, taxUserRouter)
	.use(apiPath, taxAdminRouter)
	.use(apiPath, categoryUserRouter)
	.use(apiPath, categoryAdminRouter)
	.use(apiPath, managerUserRouter)
	.use(apiPath, managerAdminRouter);

export default apiRouter;
