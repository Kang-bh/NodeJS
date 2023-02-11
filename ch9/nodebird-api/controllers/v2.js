const jwt = require('jsonwebtoken');
const { Domain, User, Post, Hashtag } = require('../models');

const createToken = async(req, res) => {
    const { clientSecret } = req.body

    try { 
        const domain = await Domain.findOne({
            where : {clientSecret},
            include: {
                model: User,
                attribute : ['nick', 'id'],
            },
        });

        if(!domain) {
            return res.status(401).json({
                code : 401,
                message : '등록되지 않은 도메인입니다.'
            })
        }

        const token = jwt.sign({
            id: domain.User.id,
            nick : domain.User.nick,
        }, process.env.JWT_SECRET, {
            expiresIn : '1m',
            issuer : 'nodebird',
        })
        
        // res.setHeader('Access-Control-Allow-Origin', '*')
        // res.setHeader('Access-Control-Allow-Credentials', 'true')
        return res.json({
            code : 200,
            message : '토큰이 발급되었습니다.',
            token,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message : '서버 에러',
        })
    }
}

const tokenTest = (req, res) => {
    res.json(res.locals.decoded)
}

const getMyPosts = (req, res) => {
    console.log(1);
    Post.findAll({
        where : {
            userId : res.locals.decoded.id
        }
    })
    .then((posts) => {
        console.log(posts);

        res.json({
            code : 200,
            payload : posts,
        })
    })
    .catch((error) => {
        console.error(error);
        return res.statud(500).json({
            code : 500,
            message : '서버 에러'
        })
    })
}

const getPostsByHashtag = async (req, res) => {
    try {
        const hashtag = await Hashtag.findOne({ where : {title : req.params.title }});

        console.log(hashtag);

        if(!hashtag) {
            return res.status(404).json({
                code : 404,
                message : '검색 결과가 존재하지 않습니다.'
            })
        }

        const posts = await hashtag.getPosts();
        return res.json({
            code : 200,
            payload : posts
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        })
    }
}

module.exports = {
    getMyPosts,
    getPostsByHashtag,
    createToken,
    tokenTest
}