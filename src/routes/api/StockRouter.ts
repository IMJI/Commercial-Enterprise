import { Router } from 'express';
import APIController from '../../controllers/api/APIController';
import Auth from '../../middlewares/Auth';
import ValidationMiddleware from '../../middlewares/Validation';
import StockService from '../../services/StockService';
import {
	stockQuerySchema,
	stockBodySchema,
	stockBodyStrictSchema
} from '../../validation/StockValidation';

const stockRouter: Router = Router();

const stockValidation = ValidationMiddleware.validate(
	stockQuerySchema,
	stockBodySchema,
	stockBodyStrictSchema
);
const anyAuth = new Auth();

const stockController = new APIController('stock', StockService);
stockRouter
	.route(`/stock/:id?`)
	.get(
		stockValidation,
		(req, res, next) => anyAuth.auth(req, res, next),
		(req, res, next) => stockController.get(req, res, next)
	)
	.post(stockValidation, (req, res, next) =>
		stockController.post(req, res, next)
	)
	.put(stockValidation, (req, res, next) => stockController.put(req, res, next))
	.delete(stockValidation, (req, res, next) =>
		stockController.delete(req, res, next)
	);

export default stockRouter;
