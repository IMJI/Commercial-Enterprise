import App from './services/App';
import Config from './services/Config';
import Logger from './services/logger/Logger'

process.env.UV_THREADPOOL_SIZE = String(Config.DEFAULT_THREAD_POOL_SIZE + Config.DB_POOL['poolMax']);
Logger.Initialize({
    dir: './logs',
    rowsRotation: 1
});
App.Startup();

async function Shutdown() : Promise<void> {
    await App.Shutdown().then(() => {
        Logger.Info('Exiting process...');
        Logger.Close();
        process.exit(0);
    });
}

process.on('SIGTERM', () => {
    Logger.Info('Received SIGTERM'); 
    Shutdown();
});
   
process.on('SIGINT', () => {
    Logger.Info('Received SIGINT');
    Shutdown();
});
   
process.on('uncaughtException', (err : Error) => {
    Logger.Error('Uncaught exception');
    Logger.Fatal(err.name + ' ' + err.message);
    Shutdown();
});