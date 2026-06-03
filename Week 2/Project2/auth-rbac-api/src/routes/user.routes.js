const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, (req, res) => {
  res.json({
    message: 'User OK',
    user: req.user
  });
});

router.post('/note', auth, (req, res) => {

  const { note } = req.body;

  setTimeout(() => {

    if (note === "fail") {
      return res.status(500).json({
        message: "Failed"
      });
    }

    res.json({
      success: true,
      note
    });

  }, 2000);

});

module.exports = router;
