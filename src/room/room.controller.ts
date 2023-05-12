import type { Request, Response } from 'express';

export class RoomController {
	public static create_room(req: Request, res: Response) {
		res.send({ 'room:create': true });
	}

	public static remove_room(req: Request, res: Response) {
		res.send({ 'room:delete': true });
	}
}
