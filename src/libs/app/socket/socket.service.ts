import type { Server as HttpServer } from 'http';
import { Server as SocketServer, type Socket } from 'socket.io';
import { IO_CONNECTION_EVENT, IO_DEFAULT_OPTION } from './socket.constants';
import { logger } from 'libs/logger';

let io: Readonly<SocketServer>;

export function createSocketClient(server: HttpServer) {
	logger.info('SOCKET try to create `socket.io` client');
	io = new SocketServer(server, IO_DEFAULT_OPTION);
	logger.info('SOCKET successfully `socket.io` client created');

	logger.info(`SOCKET "listen-on" to "${IO_CONNECTION_EVENT}"`);
	io.on(IO_CONNECTION_EVENT, function listenSocket(socket: Socket) {
		logger.info(`SOCKET client by "${socket.id}" id connected...`);
		//   const userId = socket.id;

		socket.on('disconnect', async function disconnect() {
			logger.warn(`SOCKET client by "${socket.id}" id was disconnected`);
		});

		socket.on('ding', async function ding() {
			io.emit('dong', { ding: 'dong' });
			console.log(`[${socket.id}]: /ding`);
		});

		socket.on('room', async function room(data: any) {
			const roomName = data.room_name;
			const baseRoom = io.to('/' + roomName);
			const payload = { message: 'Hello to Yol' };
			baseRoom.emit('message', payload);
			console.log(`[${socket.id}]: /room`);
		});
	});

	return io;
}
