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
    $('#badge_incompleted').html(database.incompletedLength);
    $('#badge_done').html(database.doneLength);
};

(function () {
    $('.search-div').hide();
    $('.search').on('click', function () {
        $('.search-input').val('');
        $('.username').toggle();
        $('.search-div').toggle();
        $('.search-input').focus();
    });
    
    $('.search-input').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        var result = database.findTask(value)
        var tasks = result.tasks;
        var searchInput = result.name;
        visualize.customTasks(tasks, searchInput);
    });
    
// creating a task event. 
// includes popover, timepicker, datepicker and the 'add task' event

$('#category-list').on('click', '.input-group-addon-custom', function (el) {
    var parent = el.currentTarget.parentElement;
    var target = el.target;
    sharedState.catId = parent.id;
    var title = $('div#' + parent.id + ' span.catName')[0].innerHTML.trim();

    // think it's xss vaulnerable
    var popoverContent = `
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
    $(parent).popover({
        trigger: 'manual',
        placement: 'bottom',
        html: true,
        title: title,
        content: popoverContent,
    });

    $(parent).popover('toggle');

    // --- settings for the time- and date-pickers ---
    var date = new Date();
    var hours;
    var minutes;

    if (date.getMinutes() < 10) {
        minutes = '0' + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }
    if (date.getHours() < 10) {
        hours = '0' + date.getMinutes();
    } else {
        hours = date.getMinutes();
    }

    $('#timepicker').timepicker({
        'timeFormat': 'H:i',
        'step': 15,
    });

    $('#datepicker').datepicker({
        minDate: 0,
        maxDate: '+1M +10D',
    });
    $('#datepicker').datepicker().datepicker('setDate', new Date());

    // --- adds a task in the information object ---
    $('#add-task').on('click', function (el) {
        var id = sharedState.catId;
        var task = $('#input-task').val();
        var priority = $('#selectPriority').val();
        var time = $('#timepicker').val();
        var date = $('#datepicker').val();
        var allCurrentTasks = database.getAllTasks();
        var lastTaskId = allCurrentTasks[allCurrentTasks.length - 1].taskId;
        if (task && priority && time && date) {
            var taskInformation = {
                'taskName': task,
                'taskDueTime': time,
                'taskDueDate': date,
                'taskPriority': priority,
                'taskId': lastTaskId + 1
            };
            database.addTask(id, taskInformation);
            $(parent).popover('hide');
            var count = visualize.categoryLength(id);
            updateBadges();
        }
    });

    // --- hides the container if the user clicks outside it ---
    $(document).mouseup(function (e) {
        var container = $('.popover');
        var calendar = $('.ui-datepicker');
        var time = $('.ui-timepicker-wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0 &&
            !calendar.is(e.target) && calendar.has(e.target).length === 0 &&
            !time.is(e.target) && time.has(e.target).length === 0) {
            $(parent).popover('hide');
        }
    });
});

$('#category-list').on('click', '.all-tasks', function (el) {
    visualize.allTasks();
    sharedState.categoryElement = el;
    sharedState.isAll = true;
});

$('#category-list').on('click', '.cat', function (el) {
    document.getElementsByClassName('main')[0].innerHTML = '';
    var catId = el.currentTarget.parentElement.id;
    sharedState.categoryId = catId;
    sharedState.categoryElement = el;
    sharedState.isAll = false;
    visualize.tasksInCategory(catId);
});

$('#category-list').on('click', '.done-tasks', function (el) {
    visualize.allDoneTasks();
});
$('#category-list').on('click', '.incompleted-tasks', function (el) {
    visualize.allIncompledTasks();
});

// --- adds a category in the UI and in the information object ---
$('.add-category').click(function () {
    var value = $('.category-input').val();
    if (value) {
        var getLastCategory = $('.category').last()[0];
        var anchor = document.createElement('a');
        var icon = document.createElement('i');
        var badge = document.createElement('span');
        var addon = document.createElement('span');
        var catName = document.createElement('span');
        var div = document.createElement('div');

        div.className = 'category input-group';
        addon.className = 'input-group-addon input-group-addon-custom';
        icon.className += 'fa fa-plus icon-plus';
        anchor.className += 'cat list-group-item';
        badge.className += ' badge';
        catName.className = 'catName';
        anchor.setAttribute('href', '#');
        anchor.setAttribute('data-toggle', 'popover');

        div.id = +getLastCategory.id + 1;
        badge.id = 'badge_' + (+getLastCategory.id + 1);
        catName.innerHTML += ' ' + value;

        div.appendChild(addon);
        addon.appendChild(icon);

        div.appendChild(anchor);
        anchor.appendChild(catName);
        anchor.appendChild(badge);

        badge.innerHTML = 0;
        getLastCategory.after(div);

        var nextId = +getLastCategory.id + 1;
        database.addCategory(nextId);
        $('.category-input').val('');
    }
});
})();
