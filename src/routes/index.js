const express = require('express');
const router = express.Router();
const { correlationId, requestLogger, rateLimiter } = require('../middleware');
const authRoutes = require('./authRoutes');
const managementRoutes = require('./managementRoutes');
const healthRoutes = require('./healthRoutes');
const fileRoutes = require('./fileRoutes');
const userRoutes = require('./userRoutes');


// 공통 미들웨어
router.use(correlationId);
router.use(requestLogger);
router.use(rateLimiter);

// Health check endpoint
router.use('/health', healthRoutes);  // /api prefix 추가

// Service routes
 // Start of Selection
router.use('/auth', authRoutes);          
router.use('/rooms', managementRoutes);
router.use('/files', fileRoutes);
router.use('/users', userRoutes);

module.exports = router;