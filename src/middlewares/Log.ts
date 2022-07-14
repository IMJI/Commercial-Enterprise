import * as express from 'express';
import * as morgan from 'morgan';
import Logger from '../services/logger/Logger';
import Config from '../services/Config';

class LogMiddleware {
    public static Mount(app : express.Application) : express.Application {
        Logger.Info('Booting HTTP log middleware...');

        app.use(morgan(Config.HTTP_LOG_FORMAT, {
            stream: {
                write: (str : string) => { Logger.Trace(str.replace('\n', '')); }
            }
        }));

        return app;
    }
}

export default LogMiddleware;