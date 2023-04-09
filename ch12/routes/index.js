const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/authMiddleware');
const indexController = require('../controllers/index');


const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
})

router.get('/', indexController.renderMain);
console.log(3)
router.get('/join', isNotLoggedIn, indexController.renderJoin)
router.get('/good', isLoggedIn, indexController.renderGood);

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('create upload directory');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024},
})

router.post('/good', isLoggedIn, upload.single('img'), indexController.createGood)

module.exports = router;