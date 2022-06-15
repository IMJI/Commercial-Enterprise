import * as express from 'express';
import Config from './Config';
import WebRouter from '../routes/WebRouter';

class WebServer {
    private express: express.Application;

    constructor() {
        this.express = express();
    }

    public Initialize() : void {
        const port : number = Config.PORT;

        this.MountRoutes(WebRouter);

        this.express.listen(port, () => {
            console.log('Web Server is listening at', port);
        }).on('error', (error : Error) => {
            console.log('Error:', error.message);
        })
    }

    public MountRoutes(router : express.Router) : void {
        this.express.use('/', router);
    }
}

export default new WebServer();