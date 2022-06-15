import { Application } from 'express';

class Routes {
    public static Mount(server : Application) : void {
        this.MountWebRoutes(server);
        this.MountAPIRoutes(server);
    }

    private static MountWebRoutes(server : Application) : void {
        // return server.use('/', )
    }

    private static MountAPIRoutes(server : Application) : void {
        
    }
}