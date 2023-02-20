const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server})

    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forward-for'] || req.connection.remoteAddress;

        console.log('새로운 클라이언트 접속', ip);

         ws.on('message', (message) => { // 클라가 send로 보낸 메시지
             console.log(decodeURIComponent(message));
         })
        ws.on('error', (error) => {
            console.error(error)
        })
        ws.on('close', () => {
            console.log('클라이언트 접속 해제', ip)
            clearInterval(ws.interval); // 연결 끊기면 3ㅊ
        })

        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.')
            }
        }, 3000)

    })

}