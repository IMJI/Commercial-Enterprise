import { Router } from 'express';
import OutgoingsController from '../controllers/api/outgoings/OutgoingsController';
// import OutgoingsController from '../controllers/api/Outgoings';

const apiRouter: Router = Router();
const apiPath = '/api';

apiRouter.route(`${apiPath}/outgoings/:id?`).get(OutgoingsController.get).post(OutgoingsController.post);
// .put(OutgoingsController.Put)
// .delete(OutgoingsController.Delete);

export default apiRouter;
