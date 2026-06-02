const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Auth RBAC API',
    version: '1.0.0',
    description: 'Week 2 Project - Auth + RBAC + JWT + PostgreSQL'
  },
  servers: [
    {
      url: 'http://localhost:5000'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;