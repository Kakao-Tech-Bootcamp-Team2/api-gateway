const express = require('express');
const router = express.Router();
const httpClient = require('../utils/httpClient');
const services = require('../config/services');

router.get('/', async (req, res) => {
  try {
    const healthChecks = await Promise.all(
      Object.values(services).map(async service => {
        try {
          await httpClient.get(`${service.url}${service.endpoints.health}`);
          return { service: service.name, status: 'up' };
        } catch (error) {
          return { service: service.name, status: 'down' };
        }
      })
    );

    const allServicesUp = healthChecks.every(check => check.status === 'up');
    
    res.status(allServicesUp ? 200 : 503).json({
      status: allServicesUp ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: healthChecks
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed'
    });
  }
});

module.exports = router;