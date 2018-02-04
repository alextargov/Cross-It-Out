/* eslint-disable */

var calculatePoints = function () {
    var done = database.getDone();
    var incompleted = database.getIncompleted();
    var doneSum = 0;
    var incompletedSum = 0;
    var low = 2;
    var medium = 5;
    var high = 10;

    for (var i = 0; i < done.length; i += 1) {
        var priority = done[i].taskPriority;
        if (priority === 'low') {
            doneSum += low;
        } else if (priority === 'medium') {
            doneSum += medium;
        } else if (priority === 'high') {
            doneSum += high;
        }
    }

    for (var i = 0; i < incompleted.length; i += 1) {
        var priority = incompleted[i].taskPriority;
        if (priority === 'low') {
            incompletedSum += low;
        } else if (priority === 'medium') {
            incompletedSum += medium;
        } else if (priority === 'high') {
            incompletedSum += high;
        }
    }

    return {
        doneSum,
        incompletedSum
    }
}

// var ONE_MINUTE = 60 * 1000;

// function showTime() {
//   // get current points
//   console.log('1');
// }

// function repeatEvery(func, interval) {
//     // Check current time and calculate the delay until next interval
//     var now = new Date();
//     var delay = interval - now % interval;

//     function start() {
//         // Execute function now...
//         func();
//         // ... and every interval
//         setInterval(func, interval);
//     }
//     // Delay execution until it's an even interval
//     setTimeout(start, delay);
// }

// repeatEvery(showTime, ONE_MINUTE);