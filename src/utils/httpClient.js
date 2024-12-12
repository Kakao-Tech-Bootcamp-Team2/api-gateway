const axios = require('axios');
const logger = require('./logger');
const { TIMEOUTS } = require('../config/constants');

const httpClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
httpClient.interceptors.request.use(
  (config) => {
    const correlationId = config.headers['x-correlation-id'];
    logger.debug('Outgoing request', {
      method: config.method,
      url: config.url,
      correlationId
    });
    return config;
  },
  (error) => {
    logger.error('Request error', { error });
    return Promise.reject(error);
  }
);

// 응답 인터셉터
httpClient.interceptors.response.use(
  (response) => {
    logger.debug('Response received', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    logger.error('Response error', {
      error: error.message,
      status: error.response?.status,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

module.exports = httpClient;