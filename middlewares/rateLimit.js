const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // max 100 request per IP
  message: 'Terlalu banyak permintaan. Coba lagi nanti.'
});

module.exports = limiter;
