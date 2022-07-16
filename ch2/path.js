const path = require('path');
// 경로 처리 위해 많이 사용

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('-----------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename - extname:', path.basename(string, path.extname(string)));
console.log('-----------------------------');
console.log('path.parse():', path.parse(string));
console.log('path.format():', path.format({
    dir: 'C:\\users\\Kang',
    name: 'path',
    ext: '.js',
}));
console.log('path.normalize():', path.normalize('C://users\\Kang\\\path.js'));
console.log('-----------------------------');

console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('-----------------------------');

console.log('path.relative():', path.relative('C:\\users\\Kang\\path.js', 'C:\\'));
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/Kang'));
console.log('path.resolve():', path.resolve(__dirname, '..', '/users', '.', '/Kang'));


//console.log(path.join(__dirname, '..', '/var.js')); // join 은 절대경로 무시
//console.log(path.resolve(__dirname, '..', '/var.js')); // 절대경로 우선

// /var.js : 절대경로
// ./var.js :  상대경로