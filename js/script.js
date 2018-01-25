/* eslint-disable */

/****** Login MODAL ******/
$('#loginModal').modal('show');
/****** Greetings login value ******/
 $(document).on("click", "#login-button", function() {
    $('#loginModal').modal('hide');
    var userName = $('#username').val();
    var wrapper = document.getElementById("greeetings-content");
    wrapper.getElementsByClassName("modal-content-heading")[0].innerHTML = "Welcome to X-it-out, " + userName + " !!!"
    wrapper.getElementsByClassName("modal-content-body")[0].innerText = "We're glad that you're with us, let's start :)";
    $('#greetings-modal').modal('show');
});

$(document).on("click", "#btn_ok", function() {
    $('#greetings-modal').modal('hide');
});

// --- gets the info from the JSON file and appends it to the UI ---
$.ajax({
    type: "GET",
    dataType: "json",
    url: "json/resources.json",
    success: function (result) {
        userCategories = result.clients[0].categories;
        for (var i = 0; i < userCategories.length; i += 1) {
            var cat = userCategories[i];

            var taskLength = cat.tasks.length;
            var getLastCategory = $(".category").last()[0];
            var anchor = document.createElement("a");
            var icon = document.createElement("i");
            var badge = document.createElement("span");

            var nextId = +getLastCategory.id + 1;
            database.addCategory(nextId);

            $.each(cat.tasks, function (index, value) {
                database.addTask(nextId, value);
            });

            anchor.setAttribute("href", "#");
            anchor.setAttribute("data-toggle", "popover");
            anchor.className += "category list-group-item";
            anchor.id = +getLastCategory.id + 1;
            icon.className += " fa fa-plus";
            badge.className += " badge";
            badge.id = "badge_" + (+getLastCategory.id + 1);

            anchor.appendChild(icon);
            anchor.innerHTML += " " + cat["category-name"];
            badge.innerHTML = taskLength;
            anchor.appendChild(badge);
            getLastCategory.after(anchor);
        }
    },
    error: function (result, err, errorThrown) {
        console.log(result);
        console.log(err);
        console.log(errorThrown);
    }
});

// --- adds a category in the UI and in the information object ---
$(".add-category").click(function () {
    var value = $(".category-input").val();
    if (value) {
        var getLastCategory = $(".category").last()[0];
        var anchor = document.createElement("a");
        var icon = document.createElement("i");
        var badge = document.createElement("span");

        anchor.setAttribute("href", "#");
        anchor.setAttribute("data-toggle", "popover");
        anchor.className = "category list-group-item";
        anchor.id = +getLastCategory.id + 1;
        icon.className = "fa fa-plus";

        badge.className = "badge";
        badge.id = "badge_" + (+getLastCategory.id + 1);
        badge.innerHTML = 0;

        anchor.append(icon);
        anchor.innerHTML += " " + value;
        anchor.append(badge);
        getLastCategory.after(anchor);

        var nextId = +getLastCategory.id + 1;
        // information[+getLastCategory.id + 1] = [];
        database.addCategory(nextId);
        $(".category-input").val("");
    }
});

$(document).on("click", ".category", function (el) {
    var re = /\b[a-zA-Z0-9]\w+/g;
    var title = el.target.innerText.match(re).join(' ')
    console.log(el.target);

    $(el.target).popover({
        trigger: "manual",
        placement: "bottom",
        html: true,
        title: title,
        content: `<!-- think it's xss vaulnerable -->
            <div class="form-group">
                <div class='input-group popover-task'>
                    <input id='input-task' type='text' class='form-control'>
                    <span class="input-group-addon">
                        <i class="fa fa-th-list" aria-hidden="true"></i>
                    </span>
                </div>
                <div class='input-group date popover-task'>
                    <input type='text' class="form-control" id='timepicker' />
                    <span class="input-group-addon">
                        <i class="fa fa-clock"></i>
                    </span>
                </div>
                <div class='input-group date popover-task'>
                    <input type='text' class="form-control" id='datepicker' />
                    <span class="input-group-addon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="input-group popover-task">
                    <select class="form-control select-priority" id="selectPriority">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <span class="input-group-addon">
                        <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                </div>                
                <br>
                <button class="btn btn-primary" id="add-task">Add task</button>
                <button class="btn btn-primary" id="show-tasks">Show tasks</button>
            </div>
            `,
    });

    $(el.target).popover("toggle");

    // --- settings for the time- and date-pickers ---
    var date = new Date();
    var hours = date.getHours();
    var minutes;
    if (date.getMinutes() < 10) {
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
    $("#add-task").on("click", function () {
        var badge = $('#badge_' + el.target.id)[0];
        var currentTaskCount = +badge.innerHTML;
        badge.innerHTML = +currentTaskCount + 1;

        var task = $('#input-task').val();
        var priority = $('#selectPriority').val();
        var time = $('#timepicker').val();
        var date = $('#datepicker').val();

        if (task && priority && time && date) {
            var taskInformation = {
                "taskName": task,
                "taskDueTime": time,
                "taskDueDate": date,
                "taskPriority": priority,
            };
            database.addTask(el.target.id, taskInformation);
            $(el.target).popover("hide");
        }
    });

    // --- show all tasks in the category ---
    $("#show-tasks").on("click", function () {

    });

    // --- hides the container if the user clicks outside it ---
    $(document).mouseup(function (e) {
        var container = $('.popover');
        var calendar = $('.ui-datepicker');
        var time = $('.ui-timepicker-wrapper');

        if (!container.is(e.target) && container.has(e.target).length === 0 &&
            !calendar.is(e.target) && calendar.has(e.target).length === 0 &&
            !time.is(e.target) && time.has(e.target).length === 0) {
            $(el.target).popover("hide");
        }
    });
});

// !!! IMPORTANT - FOR SOME REASON THE CODE BELOW DOESN'T WORK FOR DYNAMICALLY CREATED ITEMS !!!!
// $(".category").click(function (el) {
//     console.log(el)
// });
