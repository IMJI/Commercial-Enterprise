import App from './services/App';
import Config from './services/Config';
import Logger from './services/logger/Logger';

process.env.UV_THREADPOOL_SIZE = String(Config.DEFAULT_THREAD_POOL_SIZE + Config.DB_POOL['poolMax']);
Logger.Initialize({
    dir: './logs',
    format: '$YYYY-$MM-$DD $HR:$MIN:$SEC:$MS $FILE $LEVEL $MESSAGE'
});
App.Startup();

async function Shutdown() : Promise<void> {
    await App.Shutdown().then(() => {
        Logger.Info('Exiting process...');
        Logger.Close();
        process.exit(0);
    });
}

process.on('SIGTERM', async () => {
    Logger.Info('Received SIGTERM'); 
    await Shutdown();
});
   
process.on('SIGINT', async () => {
    Logger.Info('Received SIGINT');
    await Shutdown();
});
   
process.on('uncaughtException', async (err : Error) => {
    Logger.Error('Uncaught exception');
    Logger.Fatal(err.name + ' ' + err.message);
    await Shutdown();
});