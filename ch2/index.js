const { odd, even } = require('./var'); //구조분해 할당시 속성명 변수명 동일해야한다.
const checkNumber = require('./func');

function checkStringOddOrEven(str){
    if (str.length % 2){
        return odd;
    } else {
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
