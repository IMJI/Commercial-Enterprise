import { Router } from 'express';
import CategoryController from '../../controllers/api/user/categories/CategoryController';
import CategoryAdminController from '../../controllers/api/admin/categories/CategoryAdminController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	categoryBodyScheme,
	categoryBodyStrictScheme,
	categoryQueryScheme
} from '../../models/category/utils/CategoryUtilities';

const categoryUserRouter: Router = Router();
const categoryAdminRouter: Router = Router();

const categoryValidation = ValidationMiddleware.validate(
	categoryQueryScheme,
	categoryBodyScheme,
	categoryBodyStrictScheme
);

categoryUserRouter
	.route(`/category/:id?`)
	.get(categoryValidation, CategoryController.get)
	.post(categoryValidation, CategoryController.post)
	.put(categoryValidation, CategoryController.put)
	.delete(categoryValidation, CategoryController.delete);

categoryAdminRouter
	.route(`/admin/category/:id?`)
	.get(categoryValidation, CategoryAdminController.get)
	.post(categoryValidation, CategoryAdminController.post)
	.put(categoryValidation, CategoryAdminController.put)
	.delete(categoryValidation, CategoryAdminController.delete);

export { categoryUserRouter, categoryAdminRouter };
