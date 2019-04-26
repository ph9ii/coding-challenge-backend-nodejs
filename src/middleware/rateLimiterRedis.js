const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');


const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = async (req, res, next) => {
  res.setHeader('X-THROTTLE', rateLimiter.points);
  
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    await rateLimiter.consume(ip);
    next();
  } catch (rejRes) {
    console.error(rejRes.message);
    res.status(429).send('Too Many Requests');
  }
};

module.exports = rateLimiterMiddleware;