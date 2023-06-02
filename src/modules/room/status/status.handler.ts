import { HttpStatusCode } from 'axios';
import type { StatusGetRequest, StatusGetResponse } from './status.interface';

export function room_status_get(req: StatusGetRequest, res: StatusGetResponse) {
	const roomName = req.params.room_name ?? '';
	res.status(HttpStatusCode.NotFound).json({
		room_name: roomName,
		is_created: false,
		is_public: false,
		is_protected: false,
		is_private: false,
	});
}
