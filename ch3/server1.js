const http =require('http');

const server  = http.createServer((req, res) => { // 비동기이기 때문
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node! </h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello</p>');
})// server 생성
    .listen(8080);
server.on('listening', () => { // port 연결
    console.log('8080번 포트에서 서버 대기 중입니다.');
});
server.on('error', (error) => {
    console.error(error); // 에러 처리
});