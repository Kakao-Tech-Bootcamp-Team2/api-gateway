const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const services = require('../config/services');

// 채팅방 관리
router.post('/', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}/api/v1/rooms`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.management.url}/api/v1/rooms`,
      {
        headers: req.headers,
        params: req.query
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:roomId', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.management.url}/api/v1/rooms/${req.params.roomId}`,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.patch('/rooms/:roomId', async (req, res, next) => {
  try {
    const response = await httpClient.patch(
      `${services.management.url}/api/v1/rooms/${req.params.roomId}`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId/invite', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}/api/v1/rooms/${req.params.userId}/invite`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId/join', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}/api/v1/rooms/${req.params.userId}/join`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// AI 관리
router.get('/ai/:aiType/settings', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.management.url}/api/v1/ai/${req.params.aiType}/settings`,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/ai/:aiType/generate', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}/api/v1/ai/${req.params.aiType}/generate`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/ai/:aiType/clear-context', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.management.url}/api/v1/ai/${req.params.aiType}/clear-context`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.put('/ai/:aiType/system-prompt', async (req, res, next) => {
  try {
    const response = await httpClient.put(
      `${services.management.url}/api/v1/ai/${req.params.aiType}/system-prompt`,
      req.body,
      {
        headers: req.headers
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
      `${services.management.url}/api/v1/notifications`,
      {
        headers: req.headers,
        params: req.query  // limit, offset, type
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.patch('/notifications/:notificationId/read', async (req, res, next) => {
  try {
    const response = await httpClient.patch(
      `${services.management.url}/api/v1/notifications/${req.params.notificationId}/read`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.patch('/notifications/read-all', async (req, res, next) => {
  try {
    const response = await httpClient.patch(
      `${services.management.url}/api/v1/notifications/read-all`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.delete('/notifications/:notificationId', async (req, res, next) => {
  try {
    const response = await httpClient.delete(
      `${services.management.url}/api/v1/notifications/${req.params.notificationId}`,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/notifications/settings', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.management.url}/api/v1/notifications/settings`,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.put('/notifications/settings', async (req, res, next) => {
  try {
    const response = await httpClient.put(
      `${services.management.url}/api/v1/notifications/settings`,
      req.body,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;