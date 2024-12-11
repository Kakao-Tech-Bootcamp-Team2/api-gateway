const services = {
    auth: {
      name: 'auth-service',
      url: process.env.AUTH_SERVICE_URL || 'http://auth-service:5001',
      timeout: 5000,
      endpoints: {
        // Auth endpoints
        login: '/api/v1/auth/login',
        register: '/api/v1/auth/register',
        validate: '/api/v1/auth/validate',
        refresh: '/api/v1/auth/refresh',
        logout: '/api/v1/auth/logout',
        profile: '/api/v1/users/profile',
        updateProfile: '/api/v1/users/profile',
        changePassword: '/api/v1/users/password'
      }
    },
  
    chat: {
      name: 'chat-service',
      url: process.env.CHAT_SERVICE_URL || 'http://chat-service:5002',
      timeout: 5000,
      endpoints: {
        // Chat endpoints
        messages: '/api/v1/messages',
        messageHistory: '/api/v1/messages/history',
        sendMessage: '/api/v1/messages/send',
        deleteMessage: '/api/v1/messages/delete',
        editMessage: '/api/v1/messages/edit',
        rooms: '/api/v1/rooms',
        joinRoom: '/api/v1/rooms/join',
        leaveRoom: '/api/v1/rooms/leave'
      }
    },
  
    management: {
      name: 'chat-management-service',
      url: process.env.MANAGEMENT_SERVICE_URL || 'http://chat-management-service:5004',
      timeout: 5000,
      endpoints: {
        // Room management
        rooms: '/api/v1/rooms',
        roomDetail: '/api/v1/rooms/:roomId',
        roomInvite: '/api/v1/rooms/:roomId/invite',
        roomJoin: '/api/v1/rooms/:roomId/join',
        
        // AI management
        aiSettings: '/api/v1/ai/:aiType/settings',
        aiGenerate: '/api/v1/ai/:aiType/generate',
        aiClearContext: '/api/v1/ai/:aiType/clear-context',
        aiSystemPrompt: '/api/v1/ai/:aiType/system-prompt',
        
        // Notification management
        notifications: '/api/v1/notifications',
        notificationRead: '/api/v1/notifications/:notificationId/read',
        notificationReadAll: '/api/v1/notifications/read-all',
        notificationDelete: '/api/v1/notifications/:notificationId',
        notificationSettings: '/api/v1/notifications/settings'
      }
    },
  
    file: {
      url: process.env.FILE_SERVICE_URL,
      endpoints: {
        uploadInit: '/api/v1/upload/init',
        uploadComplete: '/api/v1/upload/complete',
        fileInfo: '/api/v1/files',
        fileDelete: '/api/v1/files'
      }
    }
  };
  
  // 서비스 헬스체크 엔드포인트 추가
  Object.values(services).forEach(service => {
    service.endpoints.health = '/health';
  });
  
  module.exports = services;