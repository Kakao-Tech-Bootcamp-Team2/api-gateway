const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // 응답이 완료되면 로깅 기록
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('Request completed', {
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      correlationId: req.correlationId
    });
  });

  next();
};

module.exports = requestLogger;