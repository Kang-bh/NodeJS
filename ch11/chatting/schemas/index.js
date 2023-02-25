const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;

const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@127.0.0.1:27017/admin`;

const connect = () => {
    console.log(MONGO_URL);
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true)
        mongoose.set('strictQuery', false)
    }
    mongoose.connect(MONGO_URL, {
        dbName : 'gifchat',
        usenewUrlParser : true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고 디비 연결 성공');
        }
    })
}

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
})

module.exports = {
    connect,
}