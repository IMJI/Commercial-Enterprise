import { Router } from 'express';
import ValidationMiddleware from '../../middlewares/Validation';
import {
	taxBodySchema,
	taxBodyStrictSchema,
	taxQuerySchema
} from '../../validation/TaxValidator';
import APIController from '../../controllers/api/APIController';
import TaxService from '../../services/TaxService';
import Auth from '../../middlewares/Auth';
import TimestampController from '../../controllers/api/TimestampController';
import PriceService from '../../services/PriceService';

const testRouter: Router = Router();

const tsController = new TimestampController('ts', PriceService);
testRouter
	.route(`/test/:id/:timestamp?`)
	.get((req, res, next) => tsController.get(req, res, next));

export default testRouter;
