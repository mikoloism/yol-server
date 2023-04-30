import { Server as SocketIO } from 'socket.io';

class Socket {
	private static self: Socket | null = null;

	public static new(): Socket {
		if (Socket.self === null) {
			Socket.self = new Socket();
		}
		return Socket.self;
	}

	private socket: SocketIO;
	public constructor() {
		this.socket = new SocketIO();
	}

	public connect() {
		this.socket.on('connect', () => {});
	}

	public disconnect() {}
}

export default Socket;
