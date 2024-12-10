const Redis = require('ioredis');
const logger = require('./logger');

class ServiceRegistry {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'shared-redis',
      port: process.env.REDIS_PORT || 6379
    });
    this.prefix = 'service:registry:';
    this.ttl = 30; // seconds
  }

  async register(serviceName, instanceId, data) {
    const key = this.prefix + serviceName + ':' + instanceId;
    try {
      await this.redis.setex(key, this.ttl, JSON.stringify(data));
      logger.info(`Service registered: ${serviceName}`, { instanceId });
    } catch (error) {
      logger.error('Service registration failed', { error });
      throw error;
    }
  }

  async unregister(serviceName, instanceId) {
    const key = this.prefix + serviceName + ':' + instanceId;
    try {
      await this.redis.del(key);
      logger.info(`Service unregistered: ${serviceName}`, { instanceId });
    } catch (error) {
      logger.error('Service unregistration failed', { error });
      throw error;
    }
  }

  async getService(serviceName) {
    const pattern = this.prefix + serviceName + ':*';
    try {
      const keys = await this.redis.keys(pattern);
      const services = await Promise.all(
        keys.map(async (key) => {
          const data = await this.redis.get(key);
          return JSON.parse(data);
        })
      );
      return services;
    } catch (error) {
      logger.error('Service lookup failed', { error });
      throw error;
    }
  }
}

module.exports = new ServiceRegistry();