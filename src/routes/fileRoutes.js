const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const services = require('../config/services');

// 파일 업로드 초기화
router.post('/upload/init', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.file.url}/api/v1/upload/init`,
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

// 파일 업로드 완료
router.post('/upload/complete/:uploadId', async (req, res, next) => {
  try {
    const response = await httpClient.post(
      `${services.file.url}/api/v1/upload/complete/${req.params.uploadId}`,
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

// 파일 정보 조회
router.get('/files/:fileId', async (req, res, next) => {
  try {
    const response = await httpClient.get(
      `${services.file.url}/api/v1/files/${req.params.fileId}`,
      {
        headers: req.headers
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// 파일 삭제
router.delete('/files/:fileId', async (req, res, next) => {
  try {
    const response = await httpClient.delete(
      `${services.file.url}/api/v1/files/${req.params.fileId}`,
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