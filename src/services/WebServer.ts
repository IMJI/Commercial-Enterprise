import * as express from 'express';
import * as http from 'http';
import Config from './Config';
import WebRouter from '../routes/WebRouter';

class WebServer {
    private express : express.Application;
    private httpServer : http.Server;

    constructor() {
        this.express = express();
        this.httpServer = http.createServer(express);
    }

    public Initialize() : void {
        const port : number = Config.PORT;

        this.MountRoutes(WebRouter);

        this.httpServer.listen(port, () => {
            console.log('Web Server is listening at', port);
        }).on('error', (error : Error) => {
            console.log('Error:', error.message);
        })
    }

    public MountRoutes(router : express.Router) : void {
        this.express.use('/', router);
    }

    public async Close() : Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpServer.close((err : Error) => {
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