const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const renderMain = async (req, res, next) => {
    try {
        const rooms = await Room.find({});
        res.render('main', {rooms, title : 'GIF 채팅방'})
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const renderRoom = (req, res) => [
    res.render('room', {title : 'GIF 채팅방 생성'}),
]

const createRoom = async (req, res, next) => {
    try {
        const newRoom = await Room.create({
            title : req.body.title,
            max : req.body.max,
            owner: req.session.color,
            password: req.body.password
        });

        const io = req.app.get('io');
        io.of('/room').emit('roomCreated', newRoom);

        if (req.body.password) {
            res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
        } else {
            res.redirect(`/room/${newRoom._id}`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const joinRoom = async (req, res, next) => {
    try {
        const room = await Room.findOne({ _id: req.params.id });

        if (!room) {
           return res.redirect('/?error=존재하지 않는 방입니다.');
        }
        if (room.password && room.password !== req.query.password) {
            return res.redirect('/?error=비밀번호가 일치하지 않습니다.');
        }

        const io = req.app.get('io');
        const {rooms}= io.of('/room').adapter;

        if (room.max <= rooms.get(req.params.id)?.size) {
            return res.redirect('/?error=최대 인원 수가 초과되었습니다.');
        }

        return res.render('chat', {
            room,
            title : room.title,
            chats : [],
            user: req.session.color,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }}

const removeRoom = async (req, res, next) => {
    try {
        await Room.remove({
            _id: req.params.id
        });
        await Chat.remove({
            room: req.params.id
        })
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    renderMain,
    renderRoom,
    createRoom,
    joinRoom,
    removeRoom,
}