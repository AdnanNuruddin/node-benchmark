const { fork } = require('child_process');

const _NUMBER_RANGE_ = 1000000;
const _THREAD_ = 32;

let startTime = Date.now();
let realCounter = 0;
for (let index = 0; index <= _THREAD_; index += 1) {
    // fork another process
    const process = fork('./test.js');
    const mails = index;
    // send list of e-mails to forked process
    process.send({ start: index * _NUMBER_RANGE_, end: index * _NUMBER_RANGE_ + (_NUMBER_RANGE_ - 1) });
    // listen for messages from forked process
    process.on('message', (message) => {
        // console.log(`Primes in set ${index}: between ${index * _NUMBER_RANGE_} and ${index * _NUMBER_RANGE_ + (_NUMBER_RANGE_ - 1)} -> ${message.prime}`);
        realCounter++;
        console.clear();
        console.info(`Benchmark Running: ${Math.ceil((realCounter / _THREAD_) * 100)}% done`);

        if (index == _THREAD_) {
            console.log(`Total Time Taken: ${(Date.now() - startTime) / 1000} seconds`);
        }
        process.kill();
    });
}