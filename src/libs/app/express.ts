import * as cors from 'cors';
import * as express from 'express';
import { logger, logger_middleware } from 'libs/logger';
import * as path from 'path';
// import dayjs from 'dayjs';

export function createExpressApp() {
	logger.info('EXPRESS try to create application instance');
	const app = express();
	logger.info('EXPRESS application instace created');
	app.use(logger_middleware);
	logger.info('EXPRESS pluged "pino"/"morgan"');
	app.use(express.json());
	logger.info('EXPRESS pluged "express.json"');
	app.use(cors({ origin: '*' }));
	logger.info('EXPRESS pluged "cors"');
	app.use('/', express.static(path.join(__dirname, '..', 'public')));
	logger.info('EXPRESS pluged "express.static"');
	return app;
}
