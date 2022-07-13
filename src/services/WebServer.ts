import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import * as morgan from 'morgan';
import Config from './Config';
import WebRouter from '../routes/WebRouter';
import { ReviveJSON } from './utils/Utils';
import Logger from './logger/Logger';

class WebServer {
    private static express : express.Application;
    private static server : https.Server;
    private static serverOptions : https.ServerOptions;

    public static async Initialize() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const port : number = Config.PORT;
            this.serverOptions = {
                key: fs.readFileSync(path.join(__dirname, '../../key.pem')),
                cert: fs.readFileSync(path.join(__dirname, '../../cert.pem'))
            }
            this.express = express();
            this.MoundMiddlewares();
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

    private static MoundMiddlewares() : void {
        this.express.use('/public', express.static(path.join(__dirname + '/../../public')));
        this.express.use(morgan('tiny', {
            stream: {
                write: (str : string) => { Logger.Trace(str.replace('\n', '')); }
            }
        }));
        this.express.use(bodyParser.json());
        this.express.use(express.json({
            reviver: ReviveJSON
        }));
    }

    private static MountRoutes(router : express.Router) : void {
        this.express.use('/', router);
    }
}

export default WebServer;