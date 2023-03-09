import { Router } from 'express';
import RangesController from '../../controllers/api/RangesController';
import Auth from '../../middlewares/Auth';

const rangesRouter: Router = Router();

const anyAuth = new Auth();

const rangesController = new RangesController('range');
rangesRouter
	.route(`/ranges/:column`)
	.get(
		(req, res, next) => {
			anyAuth.auth(req, res, next);
		},
		(req, res, next) => {
			rangesController.get(req, res, next);
		}
	);

export default rangesRouter;
