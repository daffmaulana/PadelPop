const throttle = (delay = 1000) => {
  // Menyimpan waktu request terakhir per IP
  const lastRequestTime = {};

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (lastRequestTime[ip] && now - lastRequestTime[ip] < delay) {
      return res.status(429).json({
        message: `Terlalu cepat! Mohon tunggu ${delay / 1000} detik antar request.`,
      });
    }

    lastRequestTime[ip] = now;
    next();
  };
};

module.exports = throttle;