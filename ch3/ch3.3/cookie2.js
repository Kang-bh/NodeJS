const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    // req.headers.cookie 문자열 객체로 바꾸어주는 함수
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {}; // 데이터 저장용
// broser : 암호화 된 키를 보내 server의 중요 데이터 가져옴.

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /Login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query); // query string에서 name 추출
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5); // 5분 후 쿠키 만료
        const uniqueInt = Date.now(); // key 안 겹치게
    
        
        res.writeHead(302, { // 302: redirection Location으로 돌려보내라.
            Location: '/', 
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/`,
            // HttpOnly : javascript로 접근 못하게. 로그인에서 필수 (보안)
            // Path=/ : / 밑으로 cookie 전부 사용 가능
        });
        res.end();
    } else if (cookies.name) {
        // 세션쿠키 존재 + 만료 기간 지나지 않은 경우
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try { 
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
    .listen(8084, () => {
        console.log('8084번 포트에서 대기 중');
    });