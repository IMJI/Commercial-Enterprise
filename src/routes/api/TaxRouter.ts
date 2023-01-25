import { Router } from 'express';
import TaxController from '../../controllers/api/user/taxes/TaxController';
import TaxAdminController from '../../controllers/api/admin/taxes/TaxAdminController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	taxBodyScheme,
	taxBodyStrictScheme,
	taxQueryScheme
} from '../../models/tax/utils/TaxUtilities';
import Controller from '../../controllers/api/APIController';
import TaxService from '../../controllers/api/taxes/TaxService';

const taxUserRouter: Router = Router();
const taxAdminRouter: Router = Router();

const taxValidation = ValidationMiddleware.validate(
	taxQueryScheme,
	taxBodyScheme,
	taxBodyStrictScheme
);

// taxUserRouter
// 	.route(`/taxes/:id?`)
// 	.get(taxValidation, TaxController.get)
// 	.post(taxValidation, TaxController.post)
// 	.put(taxValidation, TaxController.put)
// 	.delete(taxValidation, TaxController.delete);
const taxController = new Controller('tax', TaxService);
taxUserRouter
	.route(`/taxes/:id?`)
	.get(taxValidation, (req, res, next) => taxController.get(req, res, next))
	.post(taxValidation, (req, res, next) => taxController.post(req, res, next))
	.put(taxValidation, (req, res, next) => taxController.put(req, res, next))
	.delete(taxValidation, (req, res, next) =>
		taxController.delete(req, res, next)
	);

taxAdminRouter
	.route(`/admin/taxes/:id?`)
	.get(taxValidation, TaxAdminController.get)
	.post(taxValidation, TaxAdminController.post)
	.put(taxValidation, TaxAdminController.put)
	.delete(taxValidation, TaxAdminController.delete);

export { taxUserRouter, taxAdminRouter };
