export class RoomException extends Error {
	public constructor(message: string) {
		super(`[room.validator]: ${message}`);
	}
}
