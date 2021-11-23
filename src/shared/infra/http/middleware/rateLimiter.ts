import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import AppError from '../../../errors/AppError';

const redisCLient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
    storeClient: redisCLient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1,
});

export default async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await limiter.consume(req.ip);
        return next();
    } catch (error) {
        throw new AppError('Too many request', 429);
    }
}
