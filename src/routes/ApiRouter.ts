import { Router } from 'express';
import { taxUserRouter, taxAdminRouter } from './api/TaxRouter';
import { categoryUserRouter, categoryAdminRouter } from './api/CategoryRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter
	.use(apiPath, taxUserRouter)
	.use(apiPath, taxAdminRouter)
	.use(apiPath, categoryUserRouter)
	.use(apiPath, categoryAdminRouter);

export default apiRouter;
