const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {email, nick, password} = req.body;
    try { 
        const exUser = await User.findOne({ whrer: {email} });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { //passport/index.js 의 serializeUser로 간다
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // 세션 쿠키를 브라우저로 보내준다. 로그인상태 유지
            return res.redirect('/');
        });
    }) (req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    // req.logout();
    // req.session.destroy();
    // res.redirect('/');
    req.logout( (err)  => {
        req.session.destroy();
        res.redirect('/');
      });
});

router.get('/kakao', passport.authenticate('kakao'));
// 카카오 홈페이지 => 로그인 => 카카오에서 /kakao/callback 요청을 보냄


router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;