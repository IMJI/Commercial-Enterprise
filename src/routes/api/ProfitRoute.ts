import { Router } from 'express';
import Auth from '../../middlewares/Auth';
import ProfitController from '../../controllers/api/ProfitController';

const profitRouter: Router = Router();
const anyAuth = new Auth();

const profitController = new ProfitController('profit');
profitRouter.route(`/profit/:timestamp?`).get(
	(req, res, next) => anyAuth.auth(req, res, next),
	(req, res, next) => profitController.get(req, res, next)
);

export default profitRouter;
