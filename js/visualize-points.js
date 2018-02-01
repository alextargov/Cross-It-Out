var ONE_MINUTE = 60 * 1000;

function showTime() {
  // get current points
  console.log('1');
}

function repeatEvery(func, interval) {
    // Check current time and calculate the delay until next interval
    var now = new Date();
    var delay = interval - now % interval;

    function start() {
        // Execute function now...
        func();
        // ... and every interval
        setInterval(func, interval);
    }
    // Delay execution until it's an even interval
    setTimeout(start, delay);
}

repeatEvery(showTime, ONE_MINUTE);