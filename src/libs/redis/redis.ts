import { Redis } from 'ioredis';

const url = process.env.REDIS_URL;
export const redisClient = new Redis(url);
