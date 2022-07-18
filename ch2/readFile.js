const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => { // 콜백 방식
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString()); 
});