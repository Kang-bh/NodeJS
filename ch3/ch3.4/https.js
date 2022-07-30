const https = require('https');
const fs = require('fs');

https.createServer({
    // 인수 추가 http와 다른
    // Sync 초기화할 때 사용.
    //letsencrypt 에서 무료 인증서 발급
    cert: fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인정서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/rhtml; charset=utf-8'});
    res.write('<h1>hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(443, () => { // https : 443 생략 가능
        console.log('443번 포트에서 서버 대기 중');
    });