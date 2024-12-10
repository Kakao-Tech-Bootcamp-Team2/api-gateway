const express = require('express');
const router = express.Router();
const { correlationId, requestLogger, rateLimiter } = require('../middleware');
const authRoutes = require('./authRoutes');
const chatRoutes = require('./chatRoutes');
const managementRoutes = require('./managementRoutes');
const healthRoutes = require('./healthRoutes');

// 공통 미들웨어
router.use(correlationId);
router.use(requestLogger);
router.use(rateLimiter);

// Health check endpoint
router.use('/api/health', healthRoutes);  // /api prefix 추가

// Service routes
router.use('/api/auth', authRoutes);      // /api prefix 추가
router.use('/api/chat', chatRoutes);      // /api prefix 추가
router.use('/api/management', managementRoutes);  // /api prefix 추가

module.exports = router;