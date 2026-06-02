const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, (req, res) => {
  res.json({
    message: 'User OK',
    user: req.user
  });
});

module.exports = router;