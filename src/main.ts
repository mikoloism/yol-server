import type { Application } from 'express';
import type { Server as HttpServer } from 'http';
import type { Redis } from 'ioredis';
import type { Server as SocketServer } from 'socket.io';
import { createExpressApp } from 'libs/app/express';
import { createHttpServer } from 'libs/app/http';
import { createRedisClient } from 'libs/app/redis';
import { createSocketClient } from 'libs/app/socket';
import { logger } from 'libs/logger';
import { task } from 'libs/operator';
import { routes } from './routes';

let app: Readonly<Application>;
let server: Readonly<HttpServer>;
let redisClient: Readonly<Redis>;
let socketClient: Readonly<SocketServer>;

task()
	.then(function logging() {
		logger.info('APPLICATION try to start...');
	})
	.then(function prepareRedis() {
		logger.info("APPLICATION prepare 'Redis'");
		redisClient = createRedisClient();
	})
	.then(function prepareExpress() {
		logger.info("APPLICATION prepare 'Express'");
		app = createExpressApp();
	})
	.then(function prepareServer() {
		logger.info("APPLICATION prepare 'HTTP Server'");
		server = createHttpServer(app as Application);
	})
	.then(function prepareSocket() {
		logger.info("APPLICATION prepare 'Socket'");
		socketClient = createSocketClient(server as HttpServer);
	})
	.then(function prepareRoutes() {
		logger.info('APPLICATION prepare "/api" routes');
		app.use('/api', routes);
	})
	.then(function listenServer() {
		logger.info("APPLICATION prepare to 'server.listen'");
		server.listen(5000, function () {
			logger.info(`APPLICATION launched on http://127.0.0.1:5000`);
		});
	})
	.catch(function handleError(error: unknown) {
		logger.error('APPLICATION launch failed...');
		logger.error(error);
	});
