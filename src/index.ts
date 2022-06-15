import App from './services/App';

App.Startup();

async function Shutdown() : Promise<void> {
    console.log('Exiting process...');
    await App.Shutdown();
    process.exit(0);
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