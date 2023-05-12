// ** Base
// import dayjs from 'dayjs';
import * as cors from 'cors';
import type { Application } from 'express';
import * as express from 'express';
import type { Server as HttpServer } from 'http';
import { createServer as createHttpServer } from 'http';
import * as path from 'path';
import { Server as SocketServer } from 'socket.io';

// ** App Module
import { IO_DEFAULT_OPTION } from './app.constants';
import { gateway } from './app.gateway';

// ** Modules Import
import { RoomModule } from './room/room.module';

export class app {
	public static app: Application;
	public static server: HttpServer;
	public static io: SocketServer;

	public static bootstrap() {
		// ** Implement
		app.app = express();
		app.server = createHttpServer(app.app);
		app.io = new SocketServer(app.server, IO_DEFAULT_OPTION);

		// ** Inject
		app.useMiddleware();
		app.useModule();
		app.useIO();

		// ** Listener
		app.server_listen();
	}

	private static server_listen() {
		app.server.listen(5000, function () {
			console.log(`[SERVER] : listening on http://127.0.0.1:5000`);
		});
	}

	private static useIO() {
		gateway.inject(app.io);
		app.io.on('connection', gateway.io_connection);
	}

	private static useMiddleware() {
		app.app.use(express.json());
		app.app.use(cors({ origin: '*' }));
		app.app.use('/', express.static(path.join(__dirname, '..', 'public')));
	}

	public static useModule() {
		RoomModule.inject(app);
	}
}
