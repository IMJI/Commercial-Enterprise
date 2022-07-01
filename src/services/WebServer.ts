import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import Config from './Config';
import WebRouter from '../routes/WebRouter';
import { ReviveJSON } from './Utils';
import Logger from './logger/Logger';

class WebServer {
    private express : express.Application;
    private server : http.Server;

    constructor() {
        this.express = express();
        this.server = http.createServer(express);
    }

    public async Initialize() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const port : number = Config.PORT;
            this.MoundMiddlewares();
            this.MountRoutes(WebRouter);
            this.server = this.express.listen(port, () => {
                Logger.Info('Web Server is listening at ' + port);
                resolve();
            })
            .on('error', (error : Error) => {
                Logger.Fatal('Error: ' + error.message);
                reject(error);
            })
        });
    }

    public async Close() : Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.close((err : Error) => {
                Logger.Info('Web server closed');
                if (err) {
                    Logger.Fatal('Error: ' + err.message);
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    private MoundMiddlewares() : void {
        this.express.use('/public', express.static(path.join(__dirname + '/../../public')));
        this.express.use(morgan('tiny', {
            stream: {
                write: (str : string) => { Logger.Trace(str.replace('\n', '')); }
            }
        }));
        // throw new Error('Error message :(');
        this.express.use(bodyParser.json());
        this.express.use(express.json({
            reviver: ReviveJSON
        }));
    }

    private MountRoutes(router : express.Router) : void {
        this.express.use('/', router);
    }
}

export default new WebServer();