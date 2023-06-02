import { RoomDeleteException } from '../room.exception';
import type { DeleteRequest, DeleteResponse } from './delete.interface';

export async function room_delete(req: DeleteRequest, res: DeleteResponse) {
	try {
		const roomName = req.params.room_name ?? '';
		throw new RoomDeleteException(`is not exist '${roomName}'`);
	} catch (error: unknown) {
		res.status(500).send({ status: 500, error });
	}
}
