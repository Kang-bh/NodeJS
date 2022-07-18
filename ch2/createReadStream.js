const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark : 16 }); // 조각 내서 전달
// highWaterMark 사용 x 시 그대로 출력
// createReadStream이 한 번에 읽는 것이 64KB이기에 한번에 읽음.

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data', chunk, chunk.length);
});
readStream.on('end', () => { 
    // 합쳐서 표현
    console.log('end: ', Buffer.concat(data).toString());
})
readStream.on('error', () => {
    console.log('error: ', err);
}) // readStream 또한 에러처림 왜냐? 비동기이기에

// Stream의 경우 메모리를 아낄 수 있다. 메모리 관련에서 효율적
// 이벤트리스너 : data, end