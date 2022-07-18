const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);

// 1GB의 파일 크기 그대로 복붙 (Buffer 방식)
// 1GB를 사용하기에 이것을 8명이 사용한다고 치면 8GB를 사용하게 되므로 서버가 터지게 된다.