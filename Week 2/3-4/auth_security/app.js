require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const pool = require('./db');

const authMiddleware = require(
    './middleware/authMiddleware'
);

const roleMiddleware = require(
    './middleware/roleMiddleware'
);

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors({

    origin: 'http://localhost:3000'

}));

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,
    max: 100

});

app.use(limiter);





// REGISTER

app.post('/register', async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const newUser = await pool.query(

            `INSERT INTO users
            (name,email,password,role)

            VALUES($1,$2,$3,$4)

            RETURNING *`,

            [name, email, hashedPassword, role]

        );

        res.json(newUser.rows[0]);

    } catch (err) {

        console.log(err.message);

    }
});




// LOGIN

app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await pool.query(

            'SELECT * FROM users WHERE email = $1',

            [email]

        );

        if(user.rows.length === 0){

            return res.status(401).json(
                'Invalid Email'
            );
        }

        const validPassword = await bcrypt.compare(

            password,

            user.rows[0].password

        );

        if(!validPassword){

            return res.status(401).json(
                'Invalid Password'
            );
        }

        const accessToken = jwt.sign(

            {
                id: user.rows[0].id,
                role: user.rows[0].role
            },

            process.env.ACCESS_TOKEN_SECRET,

            {
                expiresIn: '15m'
            }

        );

        const refreshToken = jwt.sign(

            {
                id: user.rows[0].id
            },

            process.env.REFRESH_TOKEN_SECRET,

            {
                expiresIn: '7d'
            }

        );

        res.json({

            accessToken,
            refreshToken

        });

    } catch (err) {

        console.log(err.message);

    }
});




// DASHBOARD

app.get(

    '/dashboard',

    authMiddleware,

    (req, res) => {

        res.json('Welcome Dashboard');

});




// ADMIN

app.get(

    '/admin',

    authMiddleware,

    roleMiddleware('admin'),

    (req, res) => {

        res.json('Welcome Admin');

});





app.listen(5000, () => {

    console.log('Server Running');

});