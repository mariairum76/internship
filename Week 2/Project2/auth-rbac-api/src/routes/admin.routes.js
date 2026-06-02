const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/', auth, role('admin'), (req, res) => {
  res.json({
    message: 'Admin OK'
  });
});

module.exports = router;