const http = require('http');

const sever = http.createServer((req, res) => {
    // 실행서버로 클라이언트에서 요청시 함수가 실행
    // 응답거부 가능

    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server!</p>');
    res.end('<p>Hello Kang!</p>');
    // 스트림 방식

    .listen(8080, () => {
       console.log('8080번 포트에서 서버 대기 중입니다.') 
    }); // 서버를 프로세스로 올리는 행위

})

// server.on('listening', (error) => {
//     console.log('8080번 포트에서 서버 대기 중입니다.') 
// });
server.on('error', (error) => {
    console.error(error);
});
