const express = require('express');
const router = express.Router();




router.get('/xhr/test', (req, res) => res.send("HELLO FROM EXPRESS"));


module.exports = router;