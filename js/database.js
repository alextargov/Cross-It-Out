/* eslint-disable */

var database = function () {

    var _categories = [
        []
    ];
    var tasks;

    function addCategory(id) {
        _categories[id] = [];
    }

    function addTask(catId, task) {
        _categories[catId].push(task);
    }

    function getAllTasksInCategory(id) {
        return _categories[id];
    }

    function getAllTasks() {
        var tasks = [];
        for (let i = 0; i < _categories.length; i += 1) {
            if (typeof _categories[i] === 'undefined') {
                continue;
            }
            var currentCat = _categories[i];

            for (let j = 0; j < currentCat.length; j += 1) {
                tasks.push(currentCat[j]);
            }
        }

        return tasks;
    }

    function deleteTask(id) {
        for (let i = 0; i < _categories.length; i += 1) {
            var currentCat = _categories[i];

            for (let j = 0; j < currentCat.length; j += 1) {
                if (_categories[i][j].taskId == id) {
                    var spliced =_categories[i].splice(j, 1);
                    return spliced;                    
                }
                
            }
        }
    }

    function findTask(name) {
        var allTasks = getAllTasks();
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].taskName === name) {
                return allTasks[i];
            }
        }
    }

    var getSortedAlphabetically = function(isAscending) {
        var compare = function (a, b) {
            if (a.taskName < b.taskName) {
                return -1;
            } 
            if (a.taskName > b.taskName) {
                return 1;
            }
    
            return 0;
        }

        if (isAscending) {
            return getAllTasks().sort(compare);
        } else {
            return (getAllTasks().sort(compare)).reverse();
        } 
    };
    

    return {
        addCategory,
        addTask,
        deleteTask,
        findTask,
        getAllTasks,
        getAllTasksInCategory,
        getSortedAlphabetically
    }
}();