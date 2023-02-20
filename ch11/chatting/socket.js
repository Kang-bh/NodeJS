const SocketIo = require('socket.io')

module.exports = (server) => {
    // 클라이언트 script에서 404 뜨는 경우 아래 server연결이 잘못
    const io = SocketIo(server, { path : '/socket.io' });

    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('New Client Connection!', ip, socket.id, req.ip); // 고유한 id 존재 (socket id)

        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        })

        socket.on('error', (error) => {
            console.error(error);
        });

        socket.on('reply', (data) => {
            console.log(data);
        })

        socket.interval = setInterval(() => {
            socket.emit('news', 'Hey Client, check data');
        }, 3000)

    })

}