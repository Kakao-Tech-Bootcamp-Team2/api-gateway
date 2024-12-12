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

router.patch('/:roomId', async (req, res, next) => {
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

module.exports = router;