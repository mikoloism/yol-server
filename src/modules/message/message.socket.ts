export function receiveMessage(socket: any) {
	socket.on('message', async function message(data: any) {
		const payload = { message: data };
		socket.broadcast.emit('room-name', payload);
	});
}
