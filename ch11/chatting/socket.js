const SocketIo = require('socket.io')

module.exports = (server, app) => {
    // 클라이언트 script에서 404 뜨는 경우 아래 server연결이 잘못
    const io = SocketIo(server, { path : '/socket.io' });
    app.set('io', io) // req.app.get('io')
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection', (socket) => {
        console.log('room 네임스페이스 접속')
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제')
        })
    })

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스 접속')
        const req = socket.request;
        const { headers : { referer } } = req;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
        socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제')
            socket.leave(roomId);
        })

    })

}