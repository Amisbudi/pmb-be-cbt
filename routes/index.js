const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.send('404 Not Found!');
});

module.exports = router;
