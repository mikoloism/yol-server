import { Client } from 'redis-om';

const url = process.env.REDIS_URL;

export const redisClient = new Client();
export async function openRedis() {
	return await redisClient.open(url);
}
