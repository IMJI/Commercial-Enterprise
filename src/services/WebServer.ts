import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import Config from './Config';
import WebRouter from '../routes/WebRouter';
import { ReviveJSON } from './Utils';

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
                console.log('Web Server is listening at', port);
                resolve();
            })
            .on('error', (error : Error) => {
                console.log('Error:', error.message);
                reject(error);
            })
        });
    }

    private MoundMiddlewares() : void {
        this.express.use('/public', express.static(path.join(__dirname + '/../../public')));
        this.express.use(morgan('combined'));
        this.express.use(bodyParser.json());
        this.express.use(express.json({
            reviver: ReviveJSON
        }));
    }

    private MountRoutes(router : express.Router) : void {
        this.express.use('/', router);
    }

    public async Close() : Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.close((err : Error) => {
                if (err) {
                    reject(err);
                    console.log('Web server closed')
                    return;
                }
                resolve();
            });
        });
    }
}

export default new WebServer();