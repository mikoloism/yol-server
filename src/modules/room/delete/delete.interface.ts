import type { Request, Response } from 'express';

export type DeleteResponse = Response<{}>;
export type DeleteRequest = Request<{
	room_name: string;
}>;
