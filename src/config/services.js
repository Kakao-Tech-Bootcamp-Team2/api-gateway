const services = {
    auth: {
      name: 'auth-service',
      url: process.env.AUTH_SERVICE_URL || 'http://auth-service:5001',
      timeout: 5000,
      endpoints: {
        // Auth endpoints
        login: '/api/auth/login',
        register: '/api/auth/register',
        validate: '/api/auth/validate',
        refresh: '/api/auth/refresh',
        logout: '/api/auth/logout',
        profile: '/api/users/profile',
        updateProfile: '/api/users/profile',
        changePassword: '/api/users/password'
      }
    },
  
    chat: {
      name: 'chat-service',
      url: process.env.CHAT_SERVICE_URL || 'http://chat-service:5002',
      timeout: 5000,
      endpoints: {
        // Chat endpoints
        messages: '/api/messages',
        messageHistory: '/api/messages/history',
        sendMessage: '/api/messages/send',
        deleteMessage: '/api/messages/delete',
        editMessage: '/api/messages/edit',
        rooms: '/api/rooms',
        joinRoom: '/api/rooms/join',
        leaveRoom: '/api/rooms/leave'
      }
    },
  
    management: {
      name: 'chat-management-service',
      url: process.env.MANAGEMENT_SERVICE_URL || 'http://chat-management-service:5004',
      timeout: 5000,
      endpoints: {
        // Room management
        rooms: '/api/rooms',
        createRoom: '/api/rooms/create',
        updateRoom: '/api/rooms/update',
        deleteRoom: '/api/rooms/delete',
        roomParticipants: '/api/rooms/participants',
        
        // AI management
        ai: '/api/ai',
        aiSettings: '/api/ai/settings',
        aiResponse: '/api/ai/response',
        
        // Notification management
        notifications: '/api/notifications',
        readNotification: '/api/notifications/read',
        deleteNotification: '/api/notifications/delete'
      }
    }
  };
  
  // 서비스 헬스체크 엔드포인트 추가
  Object.values(services).forEach(service => {
    service.endpoints.health = '/health';
  });
  
  module.exports = services;