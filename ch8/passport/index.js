const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

// 메모리의 효율성 위해 생성
module.exports = () => {
    passport.serializeUser((user, done) => { // 가벼운것
        done(null, user.id); // 세션에 user의 id만 저장
    });

    // { id: 3, 'connect.sid' : s%3189203810391280}

    passport.deserializeUser((id, done) => { // 가벼운 정보로 전체 정보 복구
        User.findAOne({ where: { id }})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};