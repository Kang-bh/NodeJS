const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { createToken, tokenTest } = require('../controllers/v1')

const router = express.Router();

router.post('/token', createToken)

router.get('/test', verifyToken, (req, res) => {
    res.json(res.locals.decoded);
})


module.exports = router;