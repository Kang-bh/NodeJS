const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
            if(err){
                throw err;
            }
            console.log('3번', data.toString());
            fs.readFile('./readme.txt', (err, data) => {
                if(err){
                    throw err;
                }
                console.log('4번', data.toString());
            })
        });
    });
});




// 비동기 이기에 랜덤하게 나온다. => 프로그램 생성시 에로사항 발생