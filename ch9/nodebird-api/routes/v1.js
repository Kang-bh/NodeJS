const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1')

// 공통되면
const router = express.Router();

router.use(deprecated)

router.post('/token', createToken)

router.get('/test', verifyToken, (req, res) => {
    res.json(res.locals.decoded);
})

router.get('/posts/my', verifyToken, getMyPosts)

router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag)



module.exports = router;