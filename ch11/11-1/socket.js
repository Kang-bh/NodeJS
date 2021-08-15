// ws : node에서 쓸 수 있는 웹소켓
const WebSocket = require('ws');

//express 서버와 websocket 서버 연결
module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {// 웹소켓 연결 시
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);
        // 클라이언트로부터 메시지
        ws.on('message', (message) => {
            console.log(message);
        });
        ws.on('error', (error) => { // 에러 시
            console.error(error);
        })
        // 연결 종료
        ws.on('close', () => {
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
            if (ws.readyState === ws.OPEN) { // 연결상태확인
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        }, 3000);
     });
 };