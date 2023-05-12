import { RoomValidator } from './room.validator';

export class RoomService {
	public static async createRoomName(room_name: string) {
		try {
			await RoomValidator.validateRoomName(room_name);
			// check if exist
			// create new redis room
		} catch (error: unknown) {
			// except errors
		}
	}
}
