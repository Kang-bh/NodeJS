const express = require('express');
const {searchByHashtag, getMyPosts} = require('../controllers')

const router = express.Router();

router.get('/mypost', getMyPosts);

router.get('/search/:hashtag', searchByHashtag)

module.exports = router;