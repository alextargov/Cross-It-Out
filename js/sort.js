var getSortedAlphabeticallyIncr = (function() {

    var tasks = database.getAllTasks();

    function sortedTasks(tasks, descending) {
        var vals = [];

        for(let i = 0; i < tasks.length; tasks+=1) {
            vals.push(tasks[i]);
        }

        vals.sort();

        for(let j = 0; j < tasks.length; j+=1) {
            tasks[i] = vals[i];
        }
    }

    // window.onload = function() {
    //     var desc = false;
    //     document.getElementsById("test").onclick = function() {
    //         sortUnorderedList("list", desc);
    //         desc = !desc;
    //         return false;
    //     };
    // }

    return {
        tasks: tasks
    }
})();


var getSortedAlphabeticallyDecr = (function() {
    var tasks = database.getAllTasks();
    var descending = true;

    function sortedTasks(tasks, descending) {
        var vals = [];

        for(let i = 0; i < tasks.length; tasks+=1) {
            vals.push(tasks[i]);
        }

        vals.sort();

        if (descending) {
            vals.reverse();
        }

        for(let j = 0; j < tasks.length; j+=1) {
            tasks[i] = vals[i];
        }
    }

    return {
        tasks: tasks
    }
})();
