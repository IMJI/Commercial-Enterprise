import { Router } from 'express';
import TaxController from '../controllers/api/taxes/TaxController';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter.route(`${apiPath}/taxes/:id?`).get(TaxController.get);

export default apiRouter;
