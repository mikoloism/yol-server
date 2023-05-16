import { HttpStatusCode } from 'axios';
import { Request, Response, Router } from 'express';
import { createRedis } from '../../core/modules/redis';
import { RoomStatusResponse } from './room.interface';
import { RoomBody, RoomSchema } from './room.schema';
import { RoomValidator } from './room.validator';

export const router = Router();
export const prefix = '/room';

router.post('', create_room);
async function create_room(req: Request, res: Response) {
	try {
		await RoomValidator.validateCreateReqBody(req.body);
		const room_name = req.body.room_name ?? '';
		const visibility = req.body.visibility ?? 'public';
		const created_at = new Date().toString();
		await RoomValidator.validateRoomName(room_name);
		const redisClient = await createRedis();
		const roomRepository = redisClient.fetchRepository(RoomSchema);
		const roomData: RoomBody = { room_name, created_at, visibility };
		const roomEntity = roomRepository.createEntity(roomData as any);
		const roomId = await roomRepository.save(roomEntity);
		const roomJson = roomEntity.toJSON();
		res.status(HttpStatusCode.Ok).send({ room_id: roomId, ...roomJson });
	} catch (error: unknown) {
		res.status(HttpStatusCode.InternalServerError).send({ error });
	}
}

router.get('/status/:room_name', retrieve_status);
function retrieve_status(req: Request, res: Response<RoomStatusResponse>) {
	const roomName = req.params.room_name ?? '';
	res.status(HttpStatusCode.NotFound).json({
		room_name: roomName,
		is_created: false,
		is_public: false,
		is_protected: false,
		is_private: false,
	});
}

router.delete('/:room_name', remove_room);
async function remove_room(req: Request, res: Response) {
	try {
		const roomName = req.params.room_name ?? '';
		const redisClient = await createRedis();
		const roomRepository = redisClient.fetchRepository(RoomSchema);
		await roomRepository.remove(roomName);
		res.status(HttpStatusCode.Ok).send({
			'room:delete': true,
			room_name: roomName,
		});
	} catch (error: unknown) {
		res.status(500).send({ status: 500, error });
	}
}
