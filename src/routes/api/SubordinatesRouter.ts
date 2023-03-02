import { Router } from 'express';
import SubordinatesController from '../../controllers/api/SubordinatesController';
import Auth from '../../middlewares/Auth';

const subsRouter: Router = Router();
const anyAuth = new Auth();

const subsController = new SubordinatesController('subordinates');
subsRouter.route(`/subordinates`).get(
	(req, res, next) => anyAuth.auth(req, res, next),
	(req, res, next) => subsController.get(req, res, next)
);

export default subsRouter;
