import { Redis } from 'ioredis';
import { RedisError } from 'redis-om';
import * as dotenv from 'dotenv';
import { logger } from 'libs/logger';

dotenv.config();
logger.info('REDIS load ".env" file');
const redisURL = process.env.REDIS_URL;

if (redisURL == null) {
	logger.error('is "REDIS_URL" exist in ".env" file?');
	throw new RedisError('is "REDIS_URL" exist in ".env" file?');
} else {
	logger.info('REDIS enviroment variable "REDIS_URL" is loaded');
}

logger.info('REDIS try to create connection to "Redis" client');
const redisClient: Redis = new Redis(redisURL);
logger.info('REDIS successful client connected');
export { redisClient };

export function createRedisClient() {
	return redisClient;
}
