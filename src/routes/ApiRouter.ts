import { Router } from 'express';
import TaxController from '../controllers/api/taxes/TaxController';
import ValidationMiddleware from '../middlewares/Validation';
import { taxQueryScheme } from '../models/tax/utils/TaxUtilities';

const apiRouter: Router = Router();
const apiPath = '/api';

const taxValidation = ValidationMiddleware.validate(taxQueryScheme, taxQueryScheme);

apiRouter.route(`${apiPath}/taxes/:id?`).get(taxValidation, TaxController.get);

export default apiRouter;
