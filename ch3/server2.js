const http =require('http');
const fs = require('fs').promises;

const server  = http.createServer(async (req, res) => { // 비동기이기 때문
    try {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./server2.html');
        res.end(data);
    } catch (error) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); // plain: 일반 문자열
        res.end(err.message);
    }
})// server 생성
    .listen(8080);
server.on('listening', () => { // port 연결
    console.log('8080번 포트에서 서버 대기 중입니다.');
});
server.on('error', (err) => {
    console.error(err); // 에러 처리
});