const express = require('express');
const path = require('path');

const app = express();


app.set('port', process.env.PORT || 3000); // 서버에 속성 부여 = 전역 변수

app.use((req, res, next) => {
    console.log('모든 요청에 실행');
    next();
}, (req, res) => {
    throw new Error();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.send('안녕하세요);
    // res.json({name : 'hi});
    // 에러 발생 요청 한번에 한 번 응답
    // res.writeHead() 응답 보내고 head x

    // http 사용시
    // res.writeHead(200, {'Content-Type' : 'text/plain'';} );
    // res.end('안녕하세요;)

    // express 사용시
    // res.status(200).send('안녕하세요');
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/:name', (req, res) => {
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


app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});