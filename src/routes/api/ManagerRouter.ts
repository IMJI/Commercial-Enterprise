import { Router } from 'express';
import APIController from '../../controllers/api/APIController';
import ValidationMiddleware from '../../middlewares/Validation';
import ManagerService from '../../services/ManagerService';
import {
	managerBodySchema,
	managerBodyStrictSchema,
	managerQuerySchema
} from '../../validation/ManagerValidation';

const managerRouter: Router = Router();

const managerValidation = ValidationMiddleware.validate(
	managerQuerySchema,
	managerBodySchema,
	managerBodyStrictSchema
);

const managerController = new APIController('manager', ManagerService);
managerRouter
	.route(`/managers/:id?`)
	.get(managerValidation, (req, res, next) =>
		managerController.get(req, res, next)
	)
	.post(managerValidation, (req, res, next) =>
		managerController.post(req, res, next)
	)
	.put(managerValidation, (req, res, next) =>
		managerController.put(req, res, next)
	)
	.delete(managerValidation, (req, res, next) =>
		managerController.delete(req, res, next)
	);

export default managerRouter;
