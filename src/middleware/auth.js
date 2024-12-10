const jwt = require('jsonwebtoken');
const config = require('../config');
const httpClient = require('../utils/httpClient');
const logger = require('../utils/logger');
const { ERROR_MESSAGES, HEADERS } = require('../config/constants');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        const sessionId = req.headers['x-session-id'];
    
        if (!token) {
          return res.status(401).json({
            success: false,
            message: '인증 토큰이 없습니다.'
        });
    }

    try {
      // Auth 서비스에 토큰 검증 요청
      const response = await httpClient.post(
        `${config.services.auth.url}${config.services.auth.endpoints.validate}`,
        { token }
      );

      req.headers.authorization = `Bearer ${token}`;
      req.sessionId = sessionId;
      next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: '인증에 실패했습니다.'
        });
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    next(error);
  }
};

module.exports = authMiddleware;