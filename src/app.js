const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { correlationId, errorHandler, requestLogger } = require('./middleware');
const routes = require('./routes');
const logger = require('./utils/logger');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const managementRoutes = require('./routes/managementRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('./config/services');

const app = express();

// 기본 미들웨어
app.use(helmet());
app.use(cors({
  origin: config.cors.origins,
  credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 커스텀 미들웨어
app.use(correlationId);
app.use(requestLogger);

// Socket.IO 프록시 설정
app.use('/socket.io', createProxyMiddleware({ 
  target: services.chat.url,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/socket.io': '/socket.io'
  },
  onError: (err, req, res) => {
    logger.error('WebSocket proxy error:', err);
  }
}));

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: config.app.name
  });
});

// API 라우트
app.use('/api/v1', routes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/rooms', managementRoutes);
app.use('/api/ai', managementRoutes);
app.use('/api/notifications', managementRoutes);
app.use('/api/users', userRoutes);

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// 에러 핸들러
app.use(errorHandler);

// 서버 시작
const PORT = config.app.port;
app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
  logger.info(`Environment: ${config.app.env}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Performing graceful shutdown...');
  process.exit(0);
});

module.exports = app;