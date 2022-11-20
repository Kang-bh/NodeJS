// 여러 라우터에서 재사용할 미들웨어들
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwtw.verify(req.headers.authorization, process.env.JWT_SECERET);
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                cdoe: 419,
                message : '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            coe: 401,
            messgae: '유효하지 않은 토큰입니다.',
        })
    }
}