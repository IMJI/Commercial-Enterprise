import { Router } from 'express';
import ProductController from '../../controllers/api/user/products/ProductController';
import ProductAdminController from '../../controllers/api/admin/products/ProductAdminController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	productBodyScheme,
	productBodyStrictScheme,
	productQueryScheme
} from '../../models/product/utils/ProductUtilities';

const productUserRouter: Router = Router();
const productAdminRouter: Router = Router();

const productValidation = ValidationMiddleware.validate(
	productQueryScheme,
	productBodyScheme,
	productBodyStrictScheme
);

productUserRouter
	.route(`/products/:id?`)
	.get(productValidation, ProductController.get)
	.post(productValidation, ProductController.post)
	.put(productValidation, ProductController.put)
	.delete(productValidation, ProductController.delete);

productUserRouter
	.route(`/admin/products/:id?`)
	.get(productValidation, ProductAdminController.get)
	.post(productValidation, ProductAdminController.post)
	.put(productValidation, ProductAdminController.put)
	.delete(productValidation, ProductAdminController.delete);

export { productUserRouter, productAdminRouter };
