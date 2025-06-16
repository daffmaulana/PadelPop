require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimit');
const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 3001;
const https = require('https');
const fs = require('fs');
require('./config/passport');

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static('public'));

// Gunakan gateway
const apiGateway = require('./gateway');
app.use('/api', apiLimiter, apiGateway);
app.use('/api/auth', authLimiter, apiGateway);

const sslOptions = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
};

https.createServer(sslOptions, app).listen(PORTS, () => {
  console.log(`HTTPS Server berjalan di https://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
