const fs = require('fs');

let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('4번', data.toString());

// 프로그래밍상 동시 돌리기 어렵기에 비효율적
// 딱 한번 실행하는 (ex 서버 초기화 작업)에 주로 사용