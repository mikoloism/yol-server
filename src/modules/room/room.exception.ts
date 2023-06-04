export class RoomException extends Error {
	public constructor(message?: string) {
		super(message);
	}
}

export class RoomCreateException extends RoomException {
	public constructor(message?: string) {
		super(message);
	}
}

export class RoomCreateRequestException extends RoomCreateException {
	public constructor(message?: string) {
		super(message);
	}
}

export class RoomDeleteException extends RoomException {
	public constructor(message?: string) {
		super(message);
	}
}

export class RoomStatusException extends RoomException {
	public constructor(message?: string) {
		super(message);
	}
}

export class RoomNotExistException extends RoomStatusException {
	public constructor(message?: string) {
		super(message);
	}
}
