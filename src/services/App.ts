import Database from './Database';
import WebServer from './WebServer';
import Logger from './logger/Logger'

class App {
    public async Startup() : Promise<void> {
        Logger.StartTimer('App Startup');
        Logger.Info('Starting application...');
        try {
            Logger.Info('Initializing database module');
            await Database.Initialize();
        } catch (err) {
            Logger.Fatal(err.message);
            process.exit(1);
        }
    
        try {
            Logger.Info('Initializing web server module');
            await WebServer.Initialize();
        } catch (err) {
            Logger.Fatal(err.message);
            process.exit(1);
        }
        Logger.StopTimer('App Startup');
    }

    public async Shutdown(error? : Error) : Promise<void> {
        let err : Error = error;
        Logger.Info('Shutting down...');
        try {
            Logger.Info('Closing web server module');
            await WebServer.Close();
        } catch (e : any) {
            Logger.Error('Encountered error' + e);
            err = err || e;
        }
    
        try {
            Logger.Info('Closing database module');
            await Database.Close(); 
        } catch (e : any) {
            Logger.Error('Encountered error' + e);
            err = err || e;
        }
        if (err) Logger.Error(err.message);
        // console.log('Exiting process...');
        // if (err) process.exit(1);
        // else process.exit(0);
    }
}

export default new App;