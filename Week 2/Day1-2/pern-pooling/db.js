const { Pool } = require('pg');

const pool = new Pool({

    user: 'postgres',
    host: 'localhost',
    database: 'internship-db',
    password: 'postgres123',
    port: 5432,

    min: 2,
    max: 10,
    idleTimeoutMillis: 30000

});

module.exports = pool;