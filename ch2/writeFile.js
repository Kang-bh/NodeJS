const fs = require('fs').promises; // 이렇게 하여 Promise 방식사용

fs.writeFile('./writeme.txt', '입력완료')
    .then(() => {
        return fs.readFile('./writeme.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });