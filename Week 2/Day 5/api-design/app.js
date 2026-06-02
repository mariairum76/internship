const express = require('express');

const userRoutes = require('./routes/users');

const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.listen(5000, () => {

    console.log('Server Running');

});