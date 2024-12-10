const { STATUS_CODES } = require('../config/constants');

// src/utils/responseFormatter.js
class ResponseFormatter {
    static success(data = null, message = 'Success') {
      // 프론트엔드 응답 구조에 맞춤
      return {
        success: true,
        ...data,
        message
      };
    }
  
    static error(message = 'Error occurred', statusCode = 500, errors = null) {
      return {
        success: false,
        message,
        errors
      };
    }
}

module.exports = ResponseFormatter;