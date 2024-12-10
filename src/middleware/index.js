const authMiddleware = require('./auth');
const rateLimiter = require('./rateLimiter');
const errorHandler = require('./errorHandler');
const correlationId = require('./correlationId');
const requestLogger = require('./requestLogger');

module.exports = {
  authMiddleware,
  rateLimiter,
  errorHandler,
  correlationId,
  requestLogger
};