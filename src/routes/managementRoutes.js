const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const { authMiddleware } = require('../middleware');
const services = require('../config/services');

router.use(authMiddleware);

// 룸 관리
router.post('/rooms', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}${services.management.endpoints.createRoom}`,
      req.body,
      {
        headers: { Authorization: req.headers.authorization }
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// AI 관리
router.post('/ai/response', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}${services.management.endpoints.aiResponse}`,
      req.body,
      {
        headers: { Authorization: req.headers.authorization }
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// 알림 관리
router.get('/notifications', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.management.url}${services.management.endpoints.notifications}`,
      {
        headers: { Authorization: req.headers.authorization },
        params: req.query
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;