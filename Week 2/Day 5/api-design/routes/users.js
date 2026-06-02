const express = require('express');

const router = express.Router();



/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/', (req, res) => {

    res.status(200).json({

        message: 'All Users'

    });

});





// CREATE USER

router.post('/', (req, res) => {

    try {

        const validatedData = userSchema.parse(
            req.body
        );

        res.status(201).json({

            message: 'User Created',

            data: validatedData

        });

    } catch (err) {

        res.status(400).json({

            error: err.errors

        });

    }
});

module.exports = router;