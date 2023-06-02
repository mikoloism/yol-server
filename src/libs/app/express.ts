import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
// import dayjs from 'dayjs';

export function createExpressApp() {
	const app = express();
	app.use(express.json());
	app.use(cors({ origin: '*' }));
	app.use('/', express.static(path.join(__dirname, '..', 'public')));

	return app;
}
