import App from './services/App';
import Config from './services/Config';

process.env.UV_THREADPOOL_SIZE = String(Config.DEFAULT_THREAD_POOL_SIZE);
App.Startup();

async function Shutdown() : Promise<void> {
    await App.Shutdown().then(() => {    
        console.log('Exiting process...');
        process.exit(0);
    });
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM'); 
    Shutdown();
});
   
process.on('SIGINT', () => {
    console.log('Received SIGINT');
    Shutdown();
});
   
process.on('uncaughtException', (err : Error) => {
    console.log('Uncaught exception');
    console.error(err);
    Shutdown();
});