import { Router } from 'express';
import taxRouter from './api/TaxRouter';
import categoryRouter from './api/CategoryRouter';
import managerRouter from './api/ManagerRouter';
import productRouter from './api/ProductRouter';
import userRouter from './api/UserRouter';
import outgoingRouter from './api/OutgoingRouter';
import testRouter from './api/TimestampTestRouter';
import profitRouter from './api/ProfitRoute';
import subsRouter from './api/SubordinatesRouter';
import stockRouter from './api/StockRouter';
import rangesRouter from './api/RangesRouter';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter
	.use(apiPath, taxRouter)
	.use(apiPath, categoryRouter)
	.use(apiPath, managerRouter)
	.use(apiPath, productRouter)
	.use(apiPath, userRouter)
	.use(apiPath, outgoingRouter)
	.use(apiPath, testRouter)
	.use(apiPath, profitRouter)
	.use(apiPath, subsRouter)
	.use(apiPath, stockRouter)
	.use(apiPath, rangesRouter);

export default apiRouter;
