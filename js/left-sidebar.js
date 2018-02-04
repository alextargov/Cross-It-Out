/* eslint-disable */
var sharedState = {};

var updateBadges = function () {
    var categories = database.getAllCategories();
    $.each(categories, function (index, value) {

        // update All tasks
        if (index === 0) {
            $('#badge_' + index).html(database.tasksLength);
            return;
        }
        var length = value.length;
        $('#badge_' + index).html(length);
    });
};

$('#category-list').on("click", ".input-group-addon-custom", function (el) {
    var parent;
    var target;
    if (el.currentTarget.tagName === 'svg') {
        parent = el.currentTarget.parentElement.parentElement;
        target = el.currentTarget.target;
    } else {
        parent = el.currentTarget.parentElement;
        target = el.target;
    }

    var title = $('div#' + parent.id + ' span.catName')[0].innerHTML.trim();

    // think it's xss vaulnerable
    var popoverContent =  `
    <div class="form-group">
        <div class='input-group popover-task'>
            <input id='input-task' type='text' class='form-control'>
            <span class="input-group-addon popover-task-addon">
                <i class="fa fa-th-list" aria-hidden="true"></i>
            </span>
        </div>
        <div class='input-group date popover-task'>
            <input type='text' class="form-control" id='datepicker' />
            <span class="input-group-addon popover-task-addon">
                <i class="fa fa-calendar" aria-hidden="true"></i>
            </span>
        </div>
        <div class='input-group date popover-task'>
            <input type='text' class="form-control" id='timepicker' />
            <span class="input-group-addon popover-task-addon">
                <i class="fa fa-clock-o"></i>
            </span>
        </div>
        <div class="input-group popover-task">
            <select class="form-control select-priority" id="selectPriority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <span class="input-group-addon popover-task-addon">
                <i class="fa fa-sort" aria-hidden="true"></i>
            </span>
        </div>                
        <br>
        <button class="btn btn-primary" id="add-task">Add task</button>
    </div>
    `;
    $('div#' + parent.id).popover({
        trigger: "manual",
        placement: "bottom",
        html: true,
        title: title,
        content: popoverContent,
    });

    $('div#' + parent.id).popover("toggle");

    // --- settings for the time- and date-pickers ---
    var date = new Date();
    var hours = date.getHours();
    var minutes;

    if (date.getMinutes() < 10 ) {
        minutes = '0' + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }

    $('#timepicker').timepicker({
        'timeFormat': 'H:i',
        'step': 30,
        'disableTimeRanges': [
            ['00:00', hours + ':' + minutes],
        ],
    });

    $("#datepicker").datepicker({
        minDate: 0,
        maxDate: "+1M +10D",
    });
    $("#datepicker").datepicker().datepicker("setDate", new Date());

    // --- adds a task in the information object ---
    $("#add-task").on("click", function (el) {
        var id = target.parentElement.id;
        var task = $('#input-task').val();
        var priority = $('#selectPriority').val();
        var time = $('#timepicker').val();
        var date = $('#datepicker').val();
        var allCurrentTasks = database.getAllTasks();
        var lastTaskId = allCurrentTasks[allCurrentTasks.length - 1].taskId;
        console.log(task);
        console.log(database.getAllCategories())
        if (task && priority && time && date) {
            var taskInformation = {
                "taskName": task,
                "taskDueTime": time,
                "taskDueDate": date,
                "taskPriority": priority,
                "taskId": lastTaskId + 1
            };
            database.addTask(id, taskInformation);
            $('div#' + parent.id).popover("hide");
            var count = visualize.categoryLength(id);

            updateBadges();
        }
        visualize.tasksInCategory(id);
    });

    // --- hides the container if the user clicks outside it ---
    $(document).mouseup(function (e) {
        var container = $('.popover');
        var calendar = $('.ui-datepicker');
        var time = $('.ui-timepicker-wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0 &&
            !calendar.is(e.target) && calendar.has(e.target).length === 0 &&
            !time.is(e.target) && time.has(e.target).length === 0) {
            $('div#' + parent.id).popover("hide");
        }
    });
});

$('.main').on('click', '.delete-icon', function (deleteEl) {
    var el = sharedState.categoryElement;
    var isAll = sharedState.isAll;
    var catId = sharedState.categoryId;
    var buttonId = deleteEl.currentTarget.id;
    var taskId = buttonId.slice(4);
    database.addtoIncompleted(taskId);
    if (isAll) {
        var currentCatLength = database.getAllTasks().length;
        visualize.allTasks();
    } else {
        var currentCatLength = database.getAllTasksInCategory(catId).length;
        visualize.tasksInCategory(catId);
    }
    el.currentTarget.children[1].innerHTML = currentCatLength;
    updateBadges();
    $('#badge_incompleted').html(database.incompletedLength);

    var incompletedSum = calculatePoints().incompletedSum;
    var doneSum = calculatePoints().doneSum;
    var pointsResult = doneSum + incompletedSum;
});

$('#category-list').on("click", ".all-tasks", function (el) {
    visualize.allTasks();
    sharedState.categoryElement = el;
    sharedState.isAll = true;
    sortAllTasks(true);
});

$('#category-list').on("click", ".cat", function (el) {
    document.getElementsByClassName('main')[0].innerHTML = '';
    var catId = el.currentTarget.parentElement.id;
    sharedState.categoryId = catId;
    sharedState.categoryElement = el;
    sharedState.isAll = false;
    visualize.tasksInCategory(catId);
});

$('.main').on('click', '.done-icon', function (doneElement) {
    console.log(sharedState.categoryId);
    var el = sharedState.categoryElement;
    var isAll = sharedState.isAll;
    var catId = sharedState.categoryId;
    var buttonId = doneElement.currentTarget.id;
    var taskId = buttonId.slice(5);
    database.addToDone(taskId);
    if (isAll) {
        var currentCatLength = database.getAllTasks().length;
        visualize.allTasks();
    } else {
        var currentCatLength = database.getAllTasksInCategory(catId).length;
        visualize.tasksInCategory(catId);
    }
    el.currentTarget.children[1].innerHTML = currentCatLength;
    updateBadges();
    $('#badge_done').html(database.doneLength);

    var incompletedSum = calculatePoints().incompletedSum;
    var doneSum = calculatePoints().doneSum;
    var pointsResult = doneSum + incompletedSum;
});

// ==== sorting events ==== 

$('#sort-alphabeth-in-cat').on('click', function () {
    var catId = sharedState.categoryId;
    var $sort = $('#sort-alphabeth-in-cat');
    var result;
    if ($sort.hasClass('ascending')) {
        result = database.getSortedAlphabeticallyInCategory(catId, true);
        $sort.removeClass('ascending');
        $sort.addClass('descending');
    } else {
        result = database.getSortedAlphabeticallyInCategory(catId, false);
        $sort.removeClass('descending');
        $sort.addClass('ascending');

    }
    visualize.customTasks(result);
});

$('#category-list').on("click", ".done-tasks", function (el) {
    visualize.allDoneTasks();
});
$('#category-list').on("click", ".incompleted-tasks", function (el) {
    visualize.allIncompledTasks();
});

// --- adds a category in the UI and in the information object ---
$(".add-category").click(function () {
    var value = $(".category-input").val();
    if (value) {
        var getLastCategory = $(".category").last()[0];
        var anchor = document.createElement("a");
        var icon = document.createElement("i");
        var badge = document.createElement("span");
        var addon = document.createElement("span");
        var catName = document.createElement("span");
        var div = document.createElement("div");

        div.className = "category input-group";
        addon.className = "input-group-addon input-group-addon-custom";
        icon.className += " fa fa-plus";
        anchor.className += " cat list-group-item";
        badge.className += " badge";
        catName.className = "catName";
        anchor.setAttribute("href", "#");
        anchor.setAttribute("data-toggle", "popover");

        div.id = +getLastCategory.id + 1;
        badge.id = "badge_" + (+getLastCategory.id + 1);
        catName.innerHTML += " " + value;

        div.appendChild(addon);
        addon.appendChild(icon);

        div.appendChild(anchor);
        anchor.appendChild(catName);
        anchor.appendChild(badge);

        badge.innerHTML = 0;
        getLastCategory.after(div);

        var nextId = +getLastCategory.id + 1;
        database.addCategory(nextId);
        $(".category-input").val("");        
    }
});

$('.search').on('click', function () {
    $('.search-input').val('');
    $('.username').toggle();
    $('.search-div').toggle();
    $('.search-input').focus();
});

$(".search-input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    var tasks = database.findTask(value);

    visualize.customTasks(tasks);
});