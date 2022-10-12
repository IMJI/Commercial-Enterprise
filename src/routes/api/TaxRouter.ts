import { Router } from 'express';
import TaxController from '../../controllers/api/user/taxes/TaxController';
import TaxAdminController from '../../controllers/api/admin/taxes/TaxAdminController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	taxBodyScheme,
	taxBodyStrictScheme,
	taxQueryScheme
} from '../../models/tax/utils/TaxUtilities';

const taxUserRouter: Router = Router();
const taxAdminRouter: Router = Router();

const taxValidation = ValidationMiddleware.validate(
	taxQueryScheme,
	taxBodyScheme,
	taxBodyStrictScheme
);

taxUserRouter
	.route(`/taxes/:id?`)
	.get(taxValidation, TaxController.get)
	.post(taxValidation, TaxController.post)
	.put(taxValidation, TaxController.put)
	.delete(taxValidation, TaxController.delete);

taxAdminRouter
	.route(`/admin/taxes/:id?`)
	.get(taxValidation, TaxAdminController.get)
	.post(taxValidation, TaxAdminController.post)
	.put(taxValidation, TaxAdminController.put)
	.delete(taxValidation, TaxAdminController.delete);

export { taxUserRouter, taxAdminRouter };
