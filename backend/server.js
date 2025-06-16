const app = require('./app');
const express = require('express');
const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 3001;
const https = require('https');
const fs = require('fs');
const passport = require("passport");
require("./config/passport");

const sslOptions = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
};

app.use(passport.initialize());
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

https.createServer(sslOptions, app).listen(PORTS, () => {
  console.log(`HTTPS Server berjalan di https://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
