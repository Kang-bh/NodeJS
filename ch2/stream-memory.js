const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stteam: ', process.memoryUsage().rss);
}) // 적어도 1GB 차이는 나지 않는다. 좀 더 메모리 효율을 높여 서버에서 다양한 사용자가
// 서버 이용할 수 있게 가능