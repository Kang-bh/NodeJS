// onst value = require('./var');
const { odd, even } = require('./var'); //구조분해할당

// // console.log(value);
// console.log(odd); // console.log(value.odd);
// console.log(even); // console.log(value.even);

function checkOddOrEven(number) {
    if(number % 2){
        return odd;
    }
    else {
        return even;
    }
}

module.exports =   checkOddOrEven
// module.exports는 파일에서 한번만