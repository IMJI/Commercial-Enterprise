import { Router } from 'express';
import CategoryController from '../../controllers/api/user/categories/CategoryController';
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

export default categoryUserRouter;
