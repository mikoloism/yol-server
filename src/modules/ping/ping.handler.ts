import type { Request } from 'express';
import type { PingGetResponse } from './ping.interface';

function get_ping_request(_: Request, res: PingGetResponse) {
	res.status(200).send({ ping: 'pong' });
}

export { get_ping_request };
