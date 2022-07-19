import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import Logger from '../services/logger/Logger';
import Config from '../services/Config';

class StatusMonitorMiddleware {
    public static Mount(app : express.Application) : express.Application {
        Logger.Info('Booting Status Monitor middleware...');

        const monitorOptions : expressStatusMonitor.ExpressStatusMonitorConfig = {
			title: 'Status Monitor',
			path: '/sm',
			spans: [
				{
					interval: 1, 		// Every second
					retention: 60		// Keep 60 data-points in memory
				},
				{
					interval: 5,
					retention: 60
				},
				{
					interval: 15,
					retention: 60
				}
			],
			chartVisibility: {
				mem: true,
				rps: true,
				cpu: true,
				load: true,
				statusCodes: true,
				responseTime: true
			},
			healthChecks: [
				{
					protocol: 'https',
					host: 'localhost',
					path: '/',
					port: Config.WebServer.port
				}
			]
		};

		app.use(expressStatusMonitor(monitorOptions));

        return app;
    }
}

export default StatusMonitorMiddleware;