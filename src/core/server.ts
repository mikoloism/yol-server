import { default as createApp, type Application as ExpressApp } from 'express';
import { createServer, type Server as HttpServer } from 'http';

class Server {
	private static self: Server | null = null;
	public static new(port: string | number): Server {
		if (Server.self === null) {
			Server.self = new Server(port);
		}
		return Server.self;
	}

	private constructor(public port: string | number) {
		this.createServer();
	}

	private app!: ExpressApp;
	private server!: HttpServer;
	private createServer(): void {
		this.app = createApp();
		this.server = createServer(this.app);
		this.server.listen(this.port, this.handler);
	}

	private handler(): void {
		console.log(`[server] : running successfully on port :${this.port}`);
	}

	public register<T extends { new (): any }>(Controller: T): this {
		const controller = new Controller();
		this.app.use(controller.baseRoute, controller.expressRouter);
		return this;
	}
}

export default Server;
