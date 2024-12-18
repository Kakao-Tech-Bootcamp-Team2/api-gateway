const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const services = require('../config/services');

// 로그인
router.post('/login', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.auth.url}/api/v1/auth/login`,
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

// 회원가입
router.post('/register', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.auth.url}/api/v1/auth/register`,
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

// 토큰 갱신
router.post('/refresh', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.auth.url}/api/v1/auth/refresh`,
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

// 로그아웃
router.post('/logout', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.auth.url}/api/v1/auth/logout`,
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