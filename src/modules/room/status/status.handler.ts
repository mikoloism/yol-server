import { HttpStatusCode } from 'axios';
import { redisClient } from 'libs/app/redis';
import { Visibility } from '../room.enum';
import { RoomNotExistException } from '../room.exception';
import type { StatusGetRequest, StatusGetResponse } from './status.interface';
import { logger } from 'libs/logger';

export async function room_status_get(
	req: StatusGetRequest,
	res: StatusGetResponse,
) {
	const roomName = req.params.room_name ?? '';
	try {
		const roomKey = 'room:'.concat(roomName);
		const existStatus = await redisClient.exists(roomKey);
		logger.info({ existStatus });
		const isRoomExist = [-1, -2].includes(existStatus) === false;

		if (isRoomExist === false) {
			throw new RoomNotExistException();
		}

		const rawData = await redisClient.get(roomKey);
		const jsonData = JSON.parse(rawData);
		res.status(HttpStatusCode.Ok).json({
			room_name: roomName,
			is_created: isRoomExist,
			is_public: jsonData.visibility === Visibility.PUBLIC,
			is_protected: jsonData.visibility === Visibility.PROTECTED,
			is_private: jsonData.visibility === Visibility.PRIVATE,
		});
	} catch (error: unknown) {
		return res.status(HttpStatusCode.NotFound).json({
			room_name: roomName,
			is_created: false,
			is_public: false,
			is_protected: false,
			is_private: false,
		});
	}
}
