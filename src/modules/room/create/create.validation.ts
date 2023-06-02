import { include, length, match } from 'libs/validator/validator.utils';
import { ROOM_RESERVED_LIST } from './create.constnats';
import { RoomCreateException } from '../room.exception';

export class RoomValidator {
	public static async validateCreateReqBody(reqBody: any) {
		try {
			if (typeof reqBody === 'undefined') {
				throw new RoomCreateException('req-body is undefined');
			}

			if (Object.keys(reqBody).indexOf('room_name') === -1) {
				throw new RoomCreateException(
					'req-body did not contain room_name',
				);
			}

			if (typeof reqBody.room_name !== 'string') {
				throw new RoomCreateException(
					'room_name in req-body should be string',
				);
			}

			if (
				Object.keys(reqBody).indexOf('visibility') !== -1 &&
				typeof reqBody.visibility !== 'string' &&
				['public', 'private', 'protected'].includes(reqBody.visibility)
			) {
				throw new RoomCreateException(
					'visibility should be string and some of p|p|p',
				);
			}

			return true;
		} catch (error: unknown) {
			return false;
		}
	}

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
		throw new RoomCreateException('`room_name` is reserved');
	}

	private static isNotStartWithDigit(room_name: string): never | void {
		if (!match(room_name, /^\d/)) return;
		throw new RoomCreateException(
			"`name_name` couldn't be start with digit",
		);
	}

	private static hasValidLength(room_name: string): never | void {
		if (length(room_name, { min: 3, max: 16 })) return;
		throw new RoomCreateException(
			'`room_name` length should be `3` to `16`',
		);
	}
}
