const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const app = express();

dotenv.config();
// 거의 모든 미들웨어 next 실행

app.set('port', process.env.PORT || 3000); // 서버에 속성 부여 = 전역 변수

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET)); // 암호
// dotenv 실제 암호(비밀 키)가 털리지 않는다.
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name : 'connect.sid',
}));

// 미들웨어 확장하기
app.use('/', (req, res, next) => {
    if (req.session.id) { // 로그인 상태이면 정적파일 제공
        // 미들웨어 코드 (req, res, next)
        express.static(__dirname, 'public') (req, res, next)
    } else { // 아니면 넘어가기
        next();
    }
});

// app.use('/', express.static(__dirname, 'ch5')); 
// file 찾으면 next를 하지않음.
// 여기서 정적파일(사진, 이미지) 제공 후 next 하지 않아서 쓸모없는 미들웨어 사용 x
// bodyparser

app.use(multer().array());
app.use(express.json());
app.use(express.urlencoded({ extended : true })); // true면 qs, false면 querystring



// app.use('요청 경로', express.static('실제 경로')); // readFile 정적파일 보내는 것
// localhost:3000/hi.html           node.js/ch5/hi.html
// 보안에 큰 도움


// app.use((req, res, next) => {
//     console.log('모든 요청에 실행');
//     next();
// }, (req, res, next) => {
//     try{
//         console.log(asdfasdf);
//     } catch (error) {
//         next(error); 
//     // next에 인수가 들어가면 error처리 미들웨어로
//     }
    
// });

app.get('/', (req, res) => {
    req.seesion.id = 'hello' // session : 요청마다 개인의 저장공간
    // req.cookies // {mycookie: 'test'} 알아서 parsing 된 cookie
    // req.signedCookies; 암호화된 쿠키
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/`,
    // res.cookie('name', encodeURIComponent(name), {
    //     expires: new Date(),
    //     httpOnly: true,
    //     path: '/'
    // });
    // res.clearCookie('name', encodeURIComponent(name), {
    //     httpOnly: true,
    //     path: '/',
    // });
    res.sendFile(path.join(__dirname, 'index.html'));
//     if (true) { // 분기를 이용해 어디를 읽을 지 알 수 있음.
//         next('route');
//     } else {
//         next();
//     } // 다음 router 실행
//     // res.send('안녕하세요);
//     // res.json({name : 'hi});
//     // 에러 발생 요청 한번에 한 번 응답
//     // res.writeHead() 응답 보내고 head x

//     // http 사용시
//     // res.writeHead(200, {'Content-Type' : 'text/plain''});
//     // res.end('안녕하세요;)

//     // express 사용시
//     // res.status(200).send('안녕하세요');

//     //res.json() 은 return 값이 아니다. 그래서 밑에 것 실행
// }, (req, res) => {
//     console.log('false 면 실행');
});

app.post('/', (req, res) => {
    res.send('hello express');
});

// let hello;
// app.use((req, res, next) => {
//     hello = 'asdf'; || app.set('hello', 'asdf')
// }) 잘못된 방법 : 전역변수로 들어가기때문에 다른 곳에서 확인 가능함. 보안 문제

app.use((req, res, next) => {
    req.data = '비밀번호'; // 이렇게 하면 미들웨어간 데이터 전송 가능
    // 요청에 한번.
})

app.get('/category/:name', (req, res) => {
    req.data 
    res.send('hello wildcard');
});

app.get('/category/javascript', (req, res) => {
    res.status(200).send('hello wildcard'); // 기본 200
 });
// app.get('*', (req, res) => {
//     res.send('hello everybody'); // 모든 get요청 처리
//     // 맨 위로 가면 큰일.
// });

app.use((req, res, next) => { // 404 처리 미들웨어
    res.status(404).send('404');
});
// 라우터 모두 검색 했는데 없으면 404
// 서버쪽 404 여도 200이라고 거짓말 가능

app.use((err, req, res, next) => {
    // error 미들웨어는 네개 전부 적어야함.
    console.error(err);
    res.status(500).send('에러발생'); 
    // status 500 으로 바꾸어주어야
    // 브라우저에서 500 으로표현
})

// const a = (err, req, res, next) => {
//     console.error(err);
// };
// console.log(a.length); 4
// const b = (err, req, res) => {
//     console.error(err);
// };
// console.log(b.length) 3

// multer
const fs = require('fs');

try { // 서버 시작전 동기화작업 가능
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더 생성');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize: 5 * 1024 * 1024},
})
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.use(upload.single('image')); // 이미지 업로드는 보통 특정 라우터에서 일어나기 떄문
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});