const fs = require('fs').promises; // 이렇게 하여 Promise 방식사용

fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });