const express = require('express');
const path = require('path');

const app = express();


app.set('port', process.env.PORT || 3000); // 서버에 속성 부여 = 전역 변수
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});