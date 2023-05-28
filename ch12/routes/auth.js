const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/authMiddleware');
const {
    join,
    login,
    logout
} = require('../controllers/auth');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.post('/logout', isLoggedIn, logout);

module.exports = router;