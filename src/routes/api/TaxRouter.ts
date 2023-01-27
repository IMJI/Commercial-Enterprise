import { Router } from 'express';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	taxBodyScheme,
	taxBodyStrictScheme,
	taxQueryScheme
} from '../../models/tax/TaxUtilities';
import Controller from '../../controllers/api/APIController';
import TaxService from '../../services/TaxService';

const taxUserRouter: Router = Router();
const taxAdminRouter: Router = Router();

const taxValidation = ValidationMiddleware.validate(
	taxQueryScheme,
	taxBodyScheme,
	taxBodyStrictScheme
);

const taxController = new Controller('tax', TaxService);
taxUserRouter
	.route(`/taxes/:id?`)
	.get(taxValidation, (req, res, next) => taxController.get(req, res, next))
	.post(taxValidation, (req, res, next) => taxController.post(req, res, next))
	.put(taxValidation, (req, res, next) => taxController.put(req, res, next))
	.delete(taxValidation, (req, res, next) =>
		taxController.delete(req, res, next)
	);

export default taxUserRouter;
