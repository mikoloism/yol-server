import type { Redis } from 'ioredis';
import type { Application } from 'express';
import type { Server as HttpServer } from 'http';
import type { Server as SocketServer } from 'socket.io';
import { createExpressApp } from 'libs/app/express';
import { createHttpServer } from 'libs/app/http';
import { createRedisClient } from 'libs/app/redis';
import { createSocketClient } from 'libs/app/socket';
import { task } from 'libs/operator';
import { routes } from './routes';

let app: Readonly<Application>;
let server: Readonly<HttpServer>;
let redisClient: Readonly<Redis>;
let socketClient: Readonly<SocketServer>;

task()
	.then(function prepareRedis() {
		redisClient = createRedisClient();
	})
	.then(function prepareExpress() {
		app = createExpressApp();
	})
	.then(function prepareServer() {
		server = createHttpServer(app as Application);
	})
	.then(function prepareSocket() {
		socketClient = createSocketClient(server as HttpServer);
	})
	.then(function prepareRoutes() {
		app.use('/api', routes);
	})
	.then(function listenServer() {
		server.listen(5000, function () {
			console.log(`[SERVER] : listening on http://127.0.0.1:5000`);
		});
	});
