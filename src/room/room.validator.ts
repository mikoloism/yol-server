import { include, length, match } from 'core/validator/validator.utils';
import { ROOM_RESERVED_LIST } from './room.constants';
import { RoomException } from './room.utils';

export class RoomValidator {
	public static async validateRoomName(room_name: string) {
		try {
			RoomValidator.hasValidLength(room_name);
			RoomValidator.isNotStartWithDigit(room_name);
			RoomValidator.isReserved(room_name);
			return true;
		} catch (error: unknown) {
			return false;
		}
	}

	private static isReserved(room_name: string): never | void {
		if (!include(ROOM_RESERVED_LIST, room_name)) return;
		throw new RoomException('`room_name` is reserved');
	}

	private static isNotStartWithDigit(room_name: string): never | void {
		if (!match(room_name, /^\d/)) return;
		throw new RoomException("`name_name` couldn't be start with digit");
	}

	private static hasValidLength(room_name: string): never | void {
		if (length(room_name, { min: 3, max: 16 })) return;
		throw new RoomException('`room_name` length should be `3` to `16`');
	}
}
