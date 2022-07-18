const spawn = require('child_process').spawn;

const process = spawn('python', ['test.py']); // 새로운 프로세스를 띄워 파이썬 실행

process.stdout.on('data', function(data){
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data){
    console.error(data.toString());
}); // 실행 에러

// 노드에서 파이썬 spawn 호출 => 멀티스레드