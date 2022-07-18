const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) { // 메인 스레드
    const worker = new Worker(__filename);
    worker.on('message', (value) => console.log('워커로부터', value));
    worker.on('exit', ()=> console.log('워커 끝'));
    worker.postMessage('ping');
} else { // 워커 스레드
 parentPort.on('message', (value) => { // 핑을 보냈던 것이 워커스레드에서 value로 들어온다.
    console.log('부모로부터', value);
    parentPort.postMessage('pong');
    parentPort.close();
 })
}