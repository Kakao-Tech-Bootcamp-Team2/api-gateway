const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const services = require('../config/services');

// 메시지 관련
router.get('/messages/:roomId', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.chat.url}/api/v1/messages/history/${req.params.roomId}`,
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

router.post('/messages/send', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.chat.url}/api/v1/messages/send`,
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