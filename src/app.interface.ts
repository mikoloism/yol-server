import type { Application } from 'express';
import type { Server as HttpServer } from 'http';
import type { Server as SocketServer } from 'socket.io';

export interface AppModule {
	app: Application;
	server: HttpServer;
	io: SocketServer;
}
