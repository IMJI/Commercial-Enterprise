import { Router } from 'express';
import ProductController from '../../controllers/api/user/products/ProductController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	productBodyScheme,
	productBodyStrictScheme,
	productQueryScheme
} from '../../models/product/utils/ProductUtilities';

const productRouter: Router = Router();

const productValidation = ValidationMiddleware.validate(
	productQueryScheme,
	productBodyScheme,
	productBodyStrictScheme
);

productRouter
	.route(`/products/:id?`)
	.get(productValidation, ProductController.get)
	.post(productValidation, ProductController.post)
	.put(productValidation, ProductController.put)
	.delete(productValidation, ProductController.delete);

export default productRouter;
