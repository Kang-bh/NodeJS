const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    return res.status(403).send('로그인 필요');
}

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = 'Already Logged in'
        res.redirect(`/?error=${message}`);
    }
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn
}