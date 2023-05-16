import { Router, type Request, type Response } from 'express';

export const router = Router();
export const prefix = '/ping';

router.get('', ping_pong);
function ping_pong(_: Request, res: Response<{ ping: 'pong' }>) {
	res.status(200).send({ ping: 'pong' });
}
