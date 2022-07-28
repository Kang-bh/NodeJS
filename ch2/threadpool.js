const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

// 노드는 코어를 네개씩만 사용함을 알 수 있음.
//SET UV_THREADPOOL_SIZE=8 로 변경 가능
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('2', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8', Date.now() - start);
});