import * as morgan from 'morgan';
import pino from 'pino';

export const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
});

export const logger_middleware = morgan('dev', {
	stream: {
		write(message) {
			return logger.info(message.trim());
		},
	},
});
