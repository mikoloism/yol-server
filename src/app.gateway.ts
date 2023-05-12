import type { Socket, Server as SocketServer } from 'socket.io';
import { AppModule } from './app.interface';

export class gateway {
	private static io: SocketServer;

	public static inject(io: AppModule['io']) {
		gateway.io = io;
	}

	public static io_connection(socket: Socket) {
		const io = gateway.io;
		console.log(`[${socket.id}]: /connected...`);
		//   const userId = socket.id;

		socket.on('disconnect', disconnect);
		async function disconnect() {
			console.log(`[${socket.id}]: /disconnected...`);
		}

		socket.on('ding', ding);
		async function ding() {
			io.emit('dong', { ding: 'dong' });
			console.log(`[${socket.id}]: /ding`);
		}

		socket.on('room', room);
		async function room(data: any) {
			const roomName = data.room_name;
			const baseRoom = io.to('/' + roomName);
			const payload = { message: 'Hello to Yol' };
			baseRoom.emit('message', payload);
			console.log(`[${socket.id}]: /room`);
		}
	}
}
