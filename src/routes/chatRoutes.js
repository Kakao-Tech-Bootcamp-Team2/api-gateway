const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const { authMiddleware } = require('../middleware');
const services = require('../config/services');

// 모든 chat 라우트에 인증 미들웨어 적용
router.use(authMiddleware);

// 채팅방 관련
router.get('/rooms', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.chat.url}${services.chat.endpoints.rooms}`,
      {
        headers: { Authorization: req.headers.authorization }
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// 메시지 관련
router.get('/messages/:roomId', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.chat.url}${services.chat.endpoints.messageHistory}/${req.params.roomId}`,
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

router.post('/messages/send', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.chat.url}${services.chat.endpoints.sendMessage}`,
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

module.exports = router;