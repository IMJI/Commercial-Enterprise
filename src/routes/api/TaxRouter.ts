import { Router } from 'express';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	taxBodySchema,
	taxBodyStrictSchema,
	taxQuerySchema
} from '../../validation/TaxValidator';
import APIController from '../../controllers/api/APIController';
import TaxService from '../../services/TaxService';

const taxUserRouter: Router = Router();

const taxValidation = ValidationMiddleware.validate(
	taxQuerySchema,
	taxBodySchema,
	taxBodyStrictSchema
);

const taxController = new APIController('tax', TaxService);
taxUserRouter
	.route(`/taxes/:id?`)
	.get(taxValidation, (req, res, next) => taxController.get(req, res, next))
	.post(taxValidation, (req, res, next) => taxController.post(req, res, next))
	.put(taxValidation, (req, res, next) => taxController.put(req, res, next))
	.delete(taxValidation, (req, res, next) =>
		taxController.delete(req, res, next)
	);

export default taxUserRouter;
