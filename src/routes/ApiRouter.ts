import { Router } from 'express';
import { taxUserRouter, taxAdminRouter } from './api/TaxRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter.use(apiPath, taxUserRouter).use(apiPath, taxAdminRouter);

export default apiRouter;
