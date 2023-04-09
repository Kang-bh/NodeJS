const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/authMiddleware');
const authController = require('../controllers/auth');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
})

router.post('/join', isNotLoggedIn, authController.join);
router.post('/login', isNotLoggedIn, authController.login);
router.post('/logout', isLoggedIn, authController.logout);

module.exports = router;