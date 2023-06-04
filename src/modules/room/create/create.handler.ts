import { HttpStatusCode } from 'axios';
import { redisClient } from 'libs/app/redis';
import { Visibility } from '../room.enum';
import { RoomCreateException } from '../room.exception';
import type { CreatePostRequest, CreatePostResponse } from './create.interface';
import { RoomValidator } from './create.validation';

const ROOM_CREATE_DEFAULT_NAME = '';
const ROOM_CREATE_DEFAULT_VISIBILITY = Visibility.PUBLIC;

export async function room_create_new(
	req: CreatePostRequest,
	res: CreatePostResponse,
) {
	try {
		await RoomValidator.validateCreateReqBody(req.body);
		const room_name = req.body.room_name ?? ROOM_CREATE_DEFAULT_NAME;
		const visibility =
			req.body.visibility ?? ROOM_CREATE_DEFAULT_VISIBILITY;
		const created_at = new Date().toString();
		await RoomValidator.validateRoomName(room_name);
		const roomKey = 'room:'.concat(room_name);
		const rawData = { room_name, created_at, visibility };
		const roomData = JSON.stringify(rawData);
		const redisMessage = await redisClient.set(roomKey, roomData);
		const isRedisStored = redisMessage === 'OK';

		if (isRedisStored === false) {
			throw new RoomCreateException('cannot store data in database');
		}

		const ROOM_CREATE_SUCCESS_RESPONSE = rawData;
		const ROOM_CREATE_SUCESS_STATUS = HttpStatusCode.Created;
		res.status(ROOM_CREATE_SUCESS_STATUS).send(
			ROOM_CREATE_SUCCESS_RESPONSE,
		);
	} catch (error: unknown) {
		const ROOM_CREATE_FAILED_RESPONSE = { error };
		const ROOM_CREATE_FAILED_STATUS = HttpStatusCode.InternalServerError;
		res.status(ROOM_CREATE_FAILED_STATUS).send(ROOM_CREATE_FAILED_RESPONSE);
	}
}
