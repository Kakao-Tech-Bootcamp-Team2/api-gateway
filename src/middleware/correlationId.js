const { v4: uuidv4 } = require('uuid');
const { HEADERS } = require('../config/constants');

const correlationId = (req, res, next) => {
  const correlationId = req.headers[HEADERS.CORRELATION_ID.toLowerCase()] || uuidv4();
  req.correlationId = correlationId;
  res.setHeader(HEADERS.CORRELATION_ID, correlationId);
  next();
};

module.exports = correlationId;