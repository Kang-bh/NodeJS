const fs = require('fs');
const zlib = require('zlib'); // 파일 압축 용

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const zlibStream = zlib.createGzip(); // 압축 스트림
// const writeStream = fs.createWriteStream('./writeme3.txt');
const writeStream = fs.createWriteStream('./writeme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream); // readStream writeStream 연결 16byte씩

// stream 하면 다양한 pipe 끼리 연결 가능