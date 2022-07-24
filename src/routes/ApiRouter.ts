import { Router } from 'express';
import OutgoingsController from '../controllers/api/Outgoings';

const ApiRouter : Router = Router();
const apiPath = '/api';

ApiRouter.get(`${apiPath}/outgoings/:id?`, OutgoingsController.Get);

export default ApiRouter;