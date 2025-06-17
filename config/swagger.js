const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PadelPop API',
      version: '1.0.0',
      description: 'Dokumentasi API untuk PadelPop',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Ganti sesuai base URL Anda
      },
    ],
  },
  apis: ['./routes/*.js'], // Path ke file route Anda
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};