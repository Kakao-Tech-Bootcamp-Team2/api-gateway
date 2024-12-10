module.exports = {
    // HTTP Status Codes
    STATUS_CODES: {
      OK: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      SERVICE_UNAVAILABLE: 503
    },
  
    // Error Messages
    ERROR_MESSAGES: {
      SERVICE_UNAVAILABLE: 'Service is temporarily unavailable',
      INVALID_TOKEN: 'Invalid or expired token',
      UNAUTHORIZED: 'Unauthorized access',
      RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
      INTERNAL_ERROR: 'Internal server error'
    },
  
    // Header Names
    HEADERS: {
        AUTH_TOKEN: 'x-auth-token',
        SESSION_ID: 'x-session-id',
        CORRELATION_ID: 'x-correlation-id',
        CLIENT_IP: 'X-Client-IP',
        RATE_LIMIT_REMAINING: 'X-RateLimit-Remaining',
        RATE_LIMIT_RESET: 'X-RateLimit-Reset'
    },
  
    // Service Names
    SERVICES: {
      AUTH: 'auth-service',
      CHAT: 'chat-service',
      MANAGEMENT: 'chat-management-service'
    },
  
    // Request Timeouts (in milliseconds)
    TIMEOUTS: {
      DEFAULT: 5000,
      LONG: 10000
    },
  
    // Cache Keys
    CACHE_KEYS: {
      USER_PROFILE: 'user:profile:',
      ROOM_INFO: 'room:info:'
    },
  
    // Cache TTL (in seconds)
    CACHE_TTL: {
    USER_PROFILE: 300,  // 5 minutes
    ROOM_INFO: 60      // 1 minute
    }
};