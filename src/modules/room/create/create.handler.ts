import { HttpStatusCode } from 'axios';
import { redisClient } from 'libs/app/redis';
import { RoomCreateException } from '../room.exception';
import type { CreatePostRequest, CreatePostResponse } from './create.interface';
import { RoomValidator } from './create.validation';

export async function room_create_new(
	req: CreatePostRequest,
	res: CreatePostResponse,
) {
	try {
		await RoomValidator.validateCreateReqBody(req.body);
		const room_name = req.body.room_name ?? '';
		const visibility = req.body.visibility ?? 'public';
		const created_at = new Date().toString();
		await RoomValidator.validateRoomName(room_name);
		const roomData = { room_name, created_at, visibility };

		const redisMessage = await redisClient.set(
			'room:'.concat(room_name),
			JSON.stringify(roomData),
		);
		const isRedisStored = redisMessage === 'OK';

		if (isRedisStored === false) {
			throw new RoomCreateException('cannot store data in database');
		}

		const ROOM_CREATE_SUCCESS_RESPONSE = roomData;
		const ROOM_CREATE_SUCESS_STATUS = HttpStatusCode.Ok;
		res.status(ROOM_CREATE_SUCESS_STATUS).send(
			ROOM_CREATE_SUCCESS_RESPONSE,
		);
	} catch (error: unknown) {
		const ROOM_CREATE_FAILED_RESPONSE = { error };
		const ROOM_CREATE_FAILED_STATUS = HttpStatusCode.InternalServerError;
		res.status(ROOM_CREATE_FAILED_STATUS).send(ROOM_CREATE_FAILED_RESPONSE);
	}
}
