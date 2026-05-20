const express = require('express');
const pool = require('./db');

const app = express();

app.get('/users', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM users'
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});