/* eslint-disable */

var database = function () {

    var categories = [[]];
    var tasks;

    function addCategory(id) {
        categories[id] = [];
    }

    function addTask(catId, task) {
        categories[catId].push(task);
    }

    // for the left side bar categories
    function getAllTasksInCategory(id) {
        return categories[id];
    }

    function getAllTasks() {
        tasks = [];
        for (let i = 0; i < categories.length; i += 1) {
            if (typeof categories[i] === 'undefined') {
                continue;
            }
            var currentCat = categories[i];

            for (let j = 0; j < currentCat.length; j+=1) {
                tasks.push(currentCat[j]);
            }
        }

        return tasks;
    }

    function findTask(name) {
        var allTasks = getAllTasks();
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].taskName === name) {
                return allTasks[i];
            }
        }
    }

    return {
        addCategory,
        addTask,
        findTask,
        getAllTasks,
        getAllTasksInCategory,
    }
    // function sortAlphabetically() {

    // }
}();