import { Router } from 'express';
import APIController from '../../controllers/api/APIController';
import ValidationMiddleware from '../../middlewares/Validation';
import ProductService from '../../services/ProductService';
import {
	productBodySchema,
	productBodyStrictSchema,
	productQuerySchema
} from '../../validation/ProductValidator';

const productRouter: Router = Router();

const productValidation = ValidationMiddleware.validate(
	productQuerySchema,
	productBodySchema,
	productBodyStrictSchema
);

const productController = new APIController('product', ProductService);
productRouter
	.route(`/products/:id?`)
	.get(productValidation, (req, res, next) =>
		productController.get(req, res, next)
	)
	.post(productValidation, (req, res, next) =>
		productController.post(req, res, next)
	)
	.put(productValidation, (req, res, next) =>
		productController.put(req, res, next)
	)
	.delete(productValidation, (req, res, next) =>
		productController.delete(req, res, next)
	);

export default productRouter;
