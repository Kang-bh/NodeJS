const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const join = async (req, res, next) => {
    const { email, nick, password, money } = req.body;
    try {
        const user = await User.findOne({
            where :{
                email
            }
        })

        if (user) {
            res.redirect('/join?error=already_joined')
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email : email,
            nick : nick,
            password : hash,
            money : money,
        })

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const login = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        console.log(user)
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    }) (req, res, next);
}

const logout = async (req, res) => {
    req.logout(() => {
        res.redirect('/');
    })
}

module.exports = {
    join,
    login,
    logout,
}