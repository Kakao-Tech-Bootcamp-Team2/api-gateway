const logger = require('../utils/logger');
const { ERROR_MESSAGES, STATUS_CODES } = require('../config/constants');

const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
  
    // 에러 응답 구조 통일
    const errorResponse = {
      success: false,
      message: error.response?.data?.message || error.message || '서버 오류가 발생했습니다.'
    };
  
    // HTTP 상태 코드 매핑
    let statusCode = error.response?.status || 500;
    
    // 특정 에러 케이스 처리
    if (error.response?.data?.code === 'AUTH_FAILED') {
      statusCode = 401;
    } else if (error.code === 'ECONNABORTED') {
      statusCode = 504;
      errorResponse.message = '서버 응답 시간이 초과되었습니다.';
    }
  
    res.status(statusCode).json(errorResponse);
  };

module.exports = errorHandler;