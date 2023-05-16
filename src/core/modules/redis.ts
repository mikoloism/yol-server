import { Client } from 'redis-om';

const url = process.env.REDIS_URL;

const redisClient = new Client();
export async function createRedis() {
	return await redisClient.open(url);
}
