import { Router } from 'express';

import IndexController from '../controllers/IndexController';

const WebRouter : Router = Router();

WebRouter.get('/', IndexController.Get);

export default WebRouter;