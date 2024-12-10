const rateLimit = require('express-rate-limit');
const { createClient } = require('redis');
const RedisStore = require('rate-limit-redis').default;
const logger = require('../utils/logger');
const { ERROR_MESSAGES, HEADERS } = require('../config/constants');

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'shared-redis'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.connect().catch(console.error);

const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? `user:${req.user.id}` : req.ip;
  }
});

module.exports = rateLimiter;