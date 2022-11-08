import { Router } from 'express';
import ManagerAdminController from '../../controllers/api/admin/managers/ManagerAdminController';
import ManagerController from '../../controllers/api/user/managers/ManagerController';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	managerBodyScheme,
	managerBodyStrictScheme,
	managerQueryScheme
} from '../../models/manager/utils/ManagerUtilities';

const managerUserRouter: Router = Router();
const managerAdminRouter: Router = Router();

const managerValidation = ValidationMiddleware.validate(
	managerQueryScheme,
	managerBodyScheme,
	managerBodyStrictScheme
);

managerUserRouter
	.route(`/manager/:id?`)
	.get(managerValidation, ManagerController.get)
	.post(managerValidation, ManagerController.post)
	.put(managerValidation, ManagerController.put)
	.delete(managerValidation, ManagerController.delete);

managerAdminRouter
	.route(`/admin/manager/:id?`)
	.get(managerValidation, ManagerAdminController.get)
	.post(managerValidation, ManagerAdminController.post)
	.put(managerValidation, ManagerAdminController.put)
	.delete(managerValidation, ManagerAdminController.delete);

export { managerUserRouter, managerAdminRouter };
