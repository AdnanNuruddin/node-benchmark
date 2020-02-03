function sieveOfAtkin(offset, limit) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= limit; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            if (i >= offset) {
                primes.push(i);
            }
            for (j = i << 1; j <= limit; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes.length;
}


// receive message from master process
process.on('message', async ({ start, end }) => {
    const primeArray = sieveOfAtkin(start, end);

    // send response to master process
    process.send({ prime: primeArray });
});