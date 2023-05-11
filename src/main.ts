// import dayjs from 'dayjs';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import { Server, type Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/', express.static(path.join(__dirname, '..', 'public')));
io.on('connection', connection);

server.listen(5000, function () {
	console.log(`[SERVER] : listening on http://127.0.0.1:5000`);
});

function connection(socket: Socket) {
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
