import { Router } from 'express';
import TaxController from '../controllers/api/taxes/TaxController';
import ValidationMiddleware from '../middlewares/Validation';
import {
	taxBodyScheme,
	taxBodyStrictScheme,
	taxQueryScheme
} from '../models/tax/utils/TaxUtilities';

const apiRouter: Router = Router();
const apiPath = '/api';

const taxValidation = ValidationMiddleware.validate(
	taxQueryScheme,
	taxBodyScheme,
	taxBodyStrictScheme
);

apiRouter
	.route(`${apiPath}/taxes/:id?`)
	.get(taxValidation, TaxController.get)
	.post(taxValidation, TaxController.post)
	.put(taxValidation, TaxController.put)
	.delete(taxValidation, TaxController.delete);

export default apiRouter;
