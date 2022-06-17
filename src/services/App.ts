import Database from './Database';
import WebServer from './WebServer';

class App {
    public async Startup() : Promise<void> {
        console.log('Starting application...');
        try {
            console.log('Initializing database module');
            await Database.Initialize();
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    
        try {
            console.log('Initializing web server module');
            await WebServer.Initialize();
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    public async Shutdown(error? : Error) : Promise<void> {
        let err : Error = error;
        console.log('Shutting down...');
        try {
            console.log('Closing web server module');
            await WebServer.Close();
        } catch (e : any) {
            console.log('Encountered error', e);
            err = err || e;
        }
    
        try {
            console.log('Closing database module');
            await Database.Close(); 
        } catch (e : any) {
            console.log('Encountered error', e);
            err = err || e;
        }
        if (err) console.log(err.message);
        // console.log('Exiting process...');
        // if (err) process.exit(1);
        // else process.exit(0);
    }
}

export default new App;