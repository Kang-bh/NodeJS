console.log(this); // global 이지 않을까 하는 합리적 추측 가능
console.log(this === module.exports);

function a() {
    console.log(this === global);
}

a();

// 전역 스코프의 this 는 빈 객체