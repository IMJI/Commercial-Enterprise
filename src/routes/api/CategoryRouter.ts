import { Router } from 'express';
import APIController from '../../controllers/api/APIController';
import ValidationMiddleware from '../../middlewares/Validation';
import CategoryService from '../../services/CategoryService';
import {
	categoryQuerySchema,
	categoryBodySchema,
	categoryBodyStrictSchema
} from '../../validation/CategoryValidator';

const categoryRouter: Router = Router();

const categoryValidation = ValidationMiddleware.validate(
	categoryQuerySchema,
	categoryBodySchema,
	categoryBodyStrictSchema
);

const categoryController = new APIController('category', CategoryService);
categoryRouter
	.route(`/categories/:id?`)
	.get(categoryValidation, (req, res, next) =>
		categoryController.get(req, res, next)
	)
	.post(categoryValidation, (req, res, next) =>
		categoryController.post(req, res, next)
	)
	.put(categoryValidation, (req, res, next) =>
		categoryController.put(req, res, next)
	)
	.delete(categoryValidation, (req, res, next) =>
		categoryController.delete(req, res, next)
	);

export default categoryRouter;
