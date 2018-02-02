 /* eslint-disable */
 /*
        *** Database ***
*/

var database = (function() {

    var _categories = [
        []
    ];
    var done = [];
    var tasks;

    // is zero because it will be increased after the ajax populates the database with json tasks.

    var tasksLength = 0; 
    var doneLength = 0;

    function addCategory(id) {
        _categories[id] = [];
    }

    function getAllCategories() {
        return _categories;
    }

    function addTask(catId, task) {
        this.tasksLength += 1;
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
                    var spliced = _categories[i].splice(j, 1);
                    this.tasksLength -= 1;
                    return spliced;
                }

            }
        }
    }

    /*
        Used by getSortedByDateAndTime() and getDone()
    */

    var compareFuncByDateAndTime = function (a, b) {

        if (a.taskDueDate < b.taskDueDate)
            return -1

        if (a.taskDueDate > b.taskDueDate)
            return 1

        if (a.taskDueDate === b.taskDueDate) {
            if (a.taskDueTime < b.taskDueTime)
                return -1

            if (a.taskDueTime > b.taskDueTime)
                return 1

            return 0
        }
    }

    function addToDone(id) {
        var task = deleteTask(id);
        done.push(task[0]);
        this.tasksLength -= 1;
        this.doneLength += 1;
    }

    function getDone() {
        return done.sort(compareFuncByDateAndTime);
    }

    function findTask(name) {
        var tasks = [];
        var allTasks = getAllTasks();
        for (let i = 0; i < allTasks.length; i += 1) {
            var task = allTasks[i].taskName.toLowerCase();
            if (task.includes(name)) {
                tasks.push(allTasks[i]);
            }
        }

        return tasks;
    }

    var getSortedAlphabetically = function (isAscending) {
        var compareIncr = function (a, b) {
            if (a.taskName < b.taskName) {
                return -1;
            }
            if (a.taskName > b.taskName) {
                return 1;
            }

            return 0;
        }
        var compareDecr = function (b, a) {
            if (a.taskName < b.taskName) {
                return -1;
            }
            if (a.taskName > b.taskName) {
                return 1;
            }

            return 0;
        }
        if (isAscending) {
            return getAllTasks().sort(compareIncr);
        } else {
            return getAllTasks().sort(compareDecr);
        }
    };

    var getSortedAlphabeticallyInCategory = function (id, isAscending) {
        var compareIncr = function (a, b) {
            if (a.taskName < b.taskName) {
                return -1;
            }
            if (a.taskName > b.taskName) {
                return 1;
            }

            return 0;
        }
        var compareDecr = function (b, a) {
            if (a.taskName < b.taskName) {
                return -1;
            }
            if (a.taskName > b.taskName) {
                return 1;
            }

            return 0;
        }
        if (isAscending) {
            return getAllTasksInCategory(id).sort(compareIncr);
        } else {
            return getAllTasksInCategory(id).sort(compareDecr);
        }
    }

    var getSortedByDateAndTime = function () {
        var compareDecr = function (a, b) {
            if (a.taskDueDate > b.taskDueDate)
                return -1

            if (a.taskDueDate < b.taskDueDate)
                return 1

            if (a.taskDueDate === b.taskDueDate) {
                if (a.taskDueTime > b.taskDueTime)
                    return -1

                if (a.taskDueTime < b.taskDueTime)
                    return 1

                return 0
            }
        }
        return getAllTasks().sort(compareFuncByDateAndTime);
    }

    var findTaskByDate = function (date) {
        var tasks = [];
        var allTasks = getAllTasks();
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].taskDueDate == date) {
                tasks.push(allTasks[i]);
            } 
        }
        return tasks;
    }

    return {
        tasksLength,
        addCategory,
        addTask,
        addToDone,
        getDone,
        doneLength,
        deleteTask,
        findTaskByDate,
        findTask,
        getAllTasks,
        getAllCategories,
        getAllTasksInCategory,
        getSortedAlphabetically,
        getSortedByDateAndTime,
        getSortedAlphabeticallyInCategory,
    }
})();