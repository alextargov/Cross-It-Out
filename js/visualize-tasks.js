/* eslint-disable */

var visualize = (function () {
    function _visualizeLogic(tasks, isDoneCategory, isIncompleted, inputSearch) {
        var counter = 0;
        var row = document.createElement('div');
        var itemsToShow;

        if (window.innerWidth >= 992) {
            itemsToShow = 3;
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            itemsToShow = 2;
        } else if (window.innerWidth < 768) {
            itemsToShow = 1;
        }

        document.getElementsByClassName('main')[0].appendChild(row);

        for (var i = 0; i < tasks.length; i += 1) {
            if (counter === itemsToShow) {
                row = document.createElement('div');
                document.getElementsByClassName('main')[0].appendChild(row)
                counter = 0;
            }
            var divCol = document.createElement('div');
            var thumbnail = document.createElement('div');
            var caption = document.createElement('div');
            var footer = document.createElement('div');
            var htmlTaskNameWrapper = document.createElement('div');
            var htmlTaskName = document.createElement('h5');
            var htmlTaskDueDate = document.createElement('h5');
            var htmlTtaskDueTime = document.createElement('h5');
            var htmlTaskPriority = document.createElement('h5');
            var button = document.createElement('button');
            var deleteIcon = document.createElement('i');
            var icon = document.createElement('i');
            var doneIcon = document.createElement('i');

            button.className = 'btn btn-primary show-more';
            thumbnail.className = 'thumbnail';
            caption.className = 'caption';
            divCol.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';
            htmlTaskNameWrapper.className = 'taskNameWrapper';
            htmlTaskName.className = 'taskName';
            icon.className = 'fa fa-minus-square';
            doneIcon.className = 'fa fa-check-square done-icon';
            deleteIcon.className = 'fa fa-times delete-icon';
            deleteIcon.id = 'del-' + tasks[i].taskId;
            doneIcon.id = 'done-' + tasks[i].taskId;

            htmlTaskName.style.wordWrap = 'normal';
            htmlTaskName.style.display = 'inline';
            htmlTaskPriority.style.display = 'inline';
            htmlTaskPriority.style.padding = '0px 5px';

            var taskname = tasks[i].taskName;
            var fullTaskname = tasks[i].taskName;
            var taskduedate = tasks[i].taskDueDate;
            var taskduetime = tasks[i].taskDueTime;
            var taskpriority = tasks[i].taskPriority;

            var substr;
            if (window.innerWidth >= 1200) {
                if (taskname.length > 25) {
                    substr = taskname.substr(0, 25);
                    substr += '...';
                    taskname = substr;
                    button.innerHTML = 'More';
                    htmlTaskNameWrapper.appendChild(button);
                }
            } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                if (taskname.length > 18) {
                    substr = taskname.substr(0, 18);
                    substr += '...';
                    taskname = substr;
                    button.innerHTML = 'More';
                    htmlTaskNameWrapper.appendChild(button);
                }
            } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                if (taskname.length > 25) {
                    substr = taskname.substr(0, 25);
                    substr += '...';
                    taskname = substr;
                    button.innerHTML = 'More';
                    htmlTaskNameWrapper.appendChild(button);
                }
            } else if (window.innerWidth < 768) {
                htmlTaskName.style.wordWrap = 'break-word';
            }

            $(button).popover({
                placement: 'bottom',
                html: true,
                content: `<p style='padding: 0px; word-wrap: break-word'>${fullTaskname}</p>`,
            });

            if (inputSearch) {
                var spanBold = document.createElement('span');
                spanBold.style.fontWeight = 'bold';
                spanBold.style.color = '#337ab7';
                var startHTML = document.createElement('span');
                var endHTML = document.createElement('span');
                var tempName = taskname.toLowerCase();
                inputSearch = inputSearch.toLowerCase();
                var startIndex = tempName.indexOf(inputSearch);
                if (startIndex !== -1) {
                    if (startIndex !== 0) {
                        var start = taskname.substr(0, startIndex);
                    } else {
                        var start = '';
                    }

                    var end = taskname.substr(startIndex + inputSearch.length, taskname.length);
                    startHTML.innerHTML = start;
                    spanBold.innerHTML = taskname.substr(startIndex, inputSearch.length);
                    endHTML.innerHTML = end;
                    htmlTaskName.appendChild(startHTML);
                    htmlTaskName.appendChild(spanBold);
                    htmlTaskName.appendChild(endHTML);
                    htmlTaskNameWrapper.appendChild(htmlTaskName)
                } else {
                    htmlTaskName.innerHTML = taskname;
                    htmlTaskNameWrapper.appendChild(htmlTaskName);
                }

            } else {
                htmlTaskName.innerHTML = taskname;
                htmlTaskNameWrapper.appendChild(htmlTaskName);
            }

            htmlTaskDueDate.innerHTML = taskduedate;
            htmlTtaskDueTime.innerHTML = taskduetime;
            htmlTaskPriority.innerHTML = taskpriority;

            if (taskpriority === 'high') {
                icon.style.color = '#F00';
            } else if (taskpriority === 'medium') {
                icon.style.color = '#FF8000';
            } else {
                icon.style.color = '#0eb511';
            }

            if (isDoneCategory && !isIncompleted) {
                console.log('only in done')
                deleteIcon.style.display = 'block';
                deleteIcon.style.color = '#0eb511';
                deleteIcon.className = 'fa fa-check-square delete-icon-completed';
                caption.appendChild(deleteIcon);
                $(deleteIcon).off('click');
            }

            if (isIncompleted && !isDoneCategory) {
                console.log('only in incompleted')
                deleteIcon.style.display = 'block';
                deleteIcon.className = 'fa fa-times delete-icon-incompleted';
                doneIcon.style.display = 'none';
                deleteIcon.style.color = '#F00';
                $(thumbnail).hover(function () {

                    deleteIcon.style.color = '#F00';
                })
                caption.appendChild(deleteIcon);
            }

            if (!isDoneCategory) {
                caption.appendChild(deleteIcon);
                caption.appendChild(doneIcon);
            }

            footer.appendChild(icon);
            footer.appendChild(htmlTaskPriority);

            row.appendChild(divCol);
            divCol.appendChild(thumbnail);
            thumbnail.appendChild(caption);
            caption.appendChild(htmlTaskNameWrapper);
            caption.appendChild(htmlTaskDueDate);
            caption.appendChild(htmlTtaskDueTime);
            caption.appendChild(footer);

            counter += 1;
        }
    }

    function allTasks() {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getAllTasks();
        _visualizeLogic(tasks, false, false);
    }

    function tasksInCategory(id) {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getAllTasksInCategory(id);
        _visualizeLogic(tasks, false, false);
        return tasks;
    }

    function allDoneTasks() {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getDone();
        _visualizeLogic(tasks, true, false);
    }

    function allIncompledTasks() {
        document.getElementsByClassName('main')[0].innerHTML = '';
        var tasks = database.getIncompleted();
        _visualizeLogic(tasks, false, true);
    }

    function categoryLength(id) {
        return database.getAllTasksInCategory(id).length;
    }

    function customTasks(tasks, inputSearch) {
        document.getElementsByClassName('main')[0].innerHTML = '';
        _visualizeLogic(tasks, false, false, inputSearch);
    }

    return {
        allTasks,
        tasksInCategory,
        categoryLength,
        customTasks,
        allDoneTasks,
        allIncompledTasks
    }
})();