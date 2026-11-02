const app = require('./app');
const express = require('express');
const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 3001;
const https = require('https');
const fs = require('fs');
const passport = require("passport");
require("./config/passport");

app.use(passport.initialize());
app.use(express.static('public'));
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  // Production: platform handles HTTPS/TLS termination
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
} else {
  // Development: HTTPS with self-signed certificate
  const sslOptions = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
  };
  https.createServer(sslOptions, app).listen(PORTS, () => {
    console.log(`HTTPS Server berjalan di https://localhost:${PORTS}`);
  });
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}
