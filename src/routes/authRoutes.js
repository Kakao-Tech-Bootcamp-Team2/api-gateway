const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const { authMiddleware } = require('../middleware');
const services = require('../config/services');
const logger = require('../utils/logger');

// Public routes
router.post('/login', async (req, res, next) => {
    try {
      const response = await httpClient.post(
        `${services.auth.url}/auth/login`,
        req.body
      );
  
      // 응답 구조 변환
      const responseData = {
        success: true,
        token: response.data.token,
        sessionId: response.data.sessionId || Date.now().toString(),
        user: {
          _id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          profileImage: response.data.user.profileImage
        }
      };
  
      res.json(responseData);
    } catch (error) {
      next(error);
    }
  });
  
  router.post('/register', async (req, res, next) => {
    try {
      const response = await httpClient.post(
        `${services.auth.url}/auth/register`,
        req.body
      );
  
      // 응답 구조 변환
      const responseData = {
        success: true,
        token: response.data.token,
        sessionId: response.data.sessionId || Date.now().toString(),
        user: {
          _id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          profileImage: response.data.user.profileImage
        }
      };
  
      res.json(responseData);
    } catch (error) {
      next(error);
    }
  });

// Protected routes
router.use(authMiddleware);

router.get('/profile', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.auth.url}${services.auth.endpoints.profile}`,
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