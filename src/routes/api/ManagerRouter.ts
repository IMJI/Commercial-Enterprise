import { Router } from 'express';
import ManagerController from '../../controllers/api/user/managers/ManagerController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	managerBodyScheme,
	managerBodyStrictScheme,
	managerQueryScheme
} from '../../models/manager/utils/ManagerUtilities';

const managerRouter: Router = Router();

const managerValidation = ValidationMiddleware.validate(
	managerQueryScheme,
	managerBodyScheme,
	managerBodyStrictScheme
);

managerRouter
	.route(`/manager/:id?`)
	.get(managerValidation, ManagerController.get)
	.post(managerValidation, ManagerController.post)
	.put(managerValidation, ManagerController.put)
	.delete(managerValidation, ManagerController.delete);

export default managerRouter;
