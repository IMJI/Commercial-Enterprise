import * as express from 'express';
import * as path from 'path';
import Logger from '../services/logger/Logger';

class StaticMiddleware {
    public static Mount(app : express.Application) : express.Application {
        Logger.Info('Booting static middleware...');

        app.use('/public', express.static(path.join(__dirname + '/../../public')));

        return app;
    }
}

export default StaticMiddleware;