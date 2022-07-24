const http = require('http');

const server = http.createServer((req, res) => {
    // 실행서버로 클라이언트에서 요청시 함수가 실행
    // 응답거부 가능
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'}); // 문자열임을 알려줌
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server!</p>');
    res.end('<p>Hello Kang!</p>');
    // 스트림 방식
})
    .listen(8080);

server.on('listening', () => {
     console.log('8080번 포트에서 서버 대기 중입니다.');
 });
server.on('error', (error) => {
    console.error(error);
});

const server1 = http.createServer((req, res) => {
    // 실행서버로 클라이언트에서 요청시 함수가 실행
    // 응답거부 가능
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'}); // 문자열임을 알려줌
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server1!</p>');
    res.end('<p>Hello Kang!</p>');
    // 스트림 방식
})
    .listen(8081);
server1.on('listening', () => {
    console.log('8081번 포트에서 서버 대기 중입니다.');
});
server1.on('error', (error) => {
    console.error(error);
});
