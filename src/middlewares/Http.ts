import * as express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { ReviveJSON } from '../services/utils/Utils';
import Logger from '../services/logger/Logger';
import Config from '../services/Config';

class HttpMiddleware {
    public static Mount(app : express.Application) : express.Application {
        Logger.Info('Booting HTTP middleware...');

        app.use(bodyParser.json({
            limit: Config.MAX_UPLOAD_LIMIT
        }));
        app.use(bodyParser.urlencoded({
			limit: Config.MAX_UPLOAD_LIMIT,
			parameterLimit: Config.MAX_PARAMETER_LIMIT,
			extended: false
		}));
        app.use(helmet());
        app.use(express.json({
            reviver: ReviveJSON
        }));

        return app;
    }
}

export default HttpMiddleware;