import runApp from 'vendors/app';
import Server from 'core/server';

const PORT = process.env.PORT || 3000;

class App {
	private server!: Server;

	public constructor() {
		this.runServer();
	}

	private runServer() {
		this.runServerAsync();
	}

	private async runServerAsync() {
		this.server = Server.new(PORT);
	}

	private runServerSync() {
		this.server = Server.new(PORT);
	}
}

runApp(App);
