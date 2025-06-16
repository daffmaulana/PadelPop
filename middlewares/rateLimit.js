const rateLimit = require('express-rate-limit');

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // max 100 request per IP
  message: 'Terlalu banyak permintaan. Coba lagi nanti.',
  standardHeaders: true,
  legacyHeaders: false
});

// Auth routes limiter (lebih ketat)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 5, // max 5 request per IP
  message: 'Terlalu banyak percobaan login. Coba lagi nanti.',
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  apiLimiter,
  authLimiter
};
