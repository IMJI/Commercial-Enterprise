import * as express from 'express';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';
import * as toobusy from 'toobusy-js';
import Config from './Config';
import WebRouter from '../routes/WebRouter';
import Logger from './logger/Logger';
import HttpMiddleware from '../middlewares/Http';
import LogMiddleware from '../middlewares/Log';
import StaticMiddleware from '../middlewares/Static';
import CorsMiddleware from '../middlewares/Cors';
import StatusMonitorMiddleware from '../middlewares/StatusMonitor';

class WebServer {
    private static express : express.Application;
    private static server : https.Server;
    private static serverOptions : https.ServerOptions;

    public static async Initialize() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const port : number = Config.WebServer.port;
            this.serverOptions = {
                key: fs.readFileSync(path.join(__dirname, '../../key.pem')),
                cert: fs.readFileSync(path.join(__dirname, '../../cert.pem'))
            }
            this.express = express();
            this.MountMiddlewares();
            this.MountRoutes(WebRouter);
            this.server = https.createServer(this.serverOptions, this.express).listen(port, () => {
                Logger.Info('Web Server is listening at ' + port);
                resolve();
            })
            .on('error', (error : Error) => {
                Logger.Error(error.message);
                reject(error);
            })
        });
    }

    public static async Close() : Promise<void> {
        return new Promise((resolve, reject) => {
            toobusy.shutdown();
            this.server.close((err : Error) => {
                Logger.Info('Web server closed');
                if (err) {
                    Logger.Error(err.message);
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    private static MountMiddlewares() : void {
        this.express = StaticMiddleware.Mount(this.express);        
        this.express = HttpMiddleware.Mount(this.express);
        if (Config.WebServer.enableCORS) this.express = CorsMiddleware.Mount(this.express);
        if (Config.WebServer.enableHTTPLog) this.express = LogMiddleware.Mount(this.express);  
        this.express = StatusMonitorMiddleware.Mount(this.express);
    }

    private static MountRoutes(router : express.Router) : void {
        this.express.use('/', router);
    }
}

export default WebServer;