const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url')

const { verifyToken, apiLimiter } = require('./middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');
const { Domain } = require('../models');

const router = express.Router();
router.use(async(req, res, next) => {
    const domain = await Domain.findOne({
        where : { host: url.parse(req.get('origin'))?.host }
    })
    if (domain) {
        cors({
            origin: true,
            credentials : true
        })(req, res, next);
    } else {
        next();
    }
})
router.use(apiLimiter)

router.post('/token', createToken)

router.get('/test', verifyToken, (req, res) => {
    res.json(res.locals.decoded);
})

router.get('/posts/my', verifyToken, getMyPosts)

router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag)



module.exports = router;