const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const services = require('../config/services');


// 프로필 조회
router.get('/profile', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.auth.url}/api/v1/users/profile`,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// 프로필 수정 (비밀번호 변경)
router.put('/profile', async (req, res, next) => {
  try {
    const response = await httpClient.put(
      `${services.auth.url}/api/v1/users/profile`,
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