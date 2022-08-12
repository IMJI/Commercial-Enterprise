import { Router } from 'express';
import OutgoingsController from '../controllers/api/Outgoings';

const ApiRouter : Router = Router();
const apiPath = '/api';

ApiRouter.route(`${apiPath}/outgoings/:id?`)
    .get(OutgoingsController.Get)
    // .post(OutgoingsController.Post)
    // .put(OutgoingsController.Put)
    // .delete(OutgoingsController.Delete);

export default ApiRouter;