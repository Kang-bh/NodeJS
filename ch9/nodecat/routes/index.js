const express = require('express');
const {searchByHashtag, getMyPosts} = require('../controllers')

const router = express.Router();

router.get('/mypost', getMyPosts);

router.get('/search/:hashtag', searchByHashtag)

router.get('/', (req, res) => {
    res.render('main', { key : process.env.CLIENT_SECRET });
})

module.exports = router;