import WebServer from './WebServer';

class App {
    public Initialize() : void {
        this.LoadServer();
    }

    private LoadServer() : void {
        WebServer.Initialize();
    }
}

export default new App;