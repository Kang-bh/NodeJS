const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');
const { parentPort } = require('worker_threads');

const app = express();
app.set('port', process.env.PORT || 8001); // 개발시와 배포시 PORT 다르게
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev')); // 개발환경
app.use(express.static(path.join(__dirname, 'public'))); // express에서 정적 파일 제공
app.use(express.json()); // json 패이로드 요청 받기
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use('/', pageRouter);

app.use((req, res, next) => { // 404 처리 미들웨어
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.` );
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});