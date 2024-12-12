const rateLimit = require('express-rate-limit');
const { createClient } = require('redis');
const RedisStore = require('rate-limit-redis').default;
const logger = require('../utils/logger');
const { ERROR_MESSAGES, HEADERS } = require('../config/constants');

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'shared-redis'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.connect().catch(console.error);

// 주석 처리하여 요청 제한 기능 비활성화
/*
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
*/

// 개발 버전에서는 요청 제한을 통과시키기 위해 빈 미들웨어를 사용
const rateLimiter = (req, res, next) => {
  next(); // 요청을 통과시킴
};

module.exports = rateLimiter;