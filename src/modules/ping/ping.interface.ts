import { Response } from 'express';

export type PingGetResponse = Response<{
	ping: 'pong';
}>;
