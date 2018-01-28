/* eslint-disable */

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
            var addon = document.createElement("span");
            var catName = document.createElement("span");
            var div = document.createElement("div");

            var nextId = +getLastCategory.id + 1;
            console.log(getLastCategory);
            database.addCategory(nextId);

            $.each(cat.tasks, function (index, value) {
                database.addTask(nextId, value);
            });

            div.className = "category input-group";
            addon.className = "input-group-addon";
            icon.className += " fa fa-plus";
            anchor.className += " cat list-group-item";
            badge.className += " badge";
            catName.className = "catName";
            anchor.setAttribute("href", "#");
            anchor.setAttribute("data-toggle", "popover");

            div.id = +getLastCategory.id + 1;
            badge.id = "badge_" + (+getLastCategory.id + 1);
            catName.innerHTML += " " + cat["category-name"];

            div.appendChild(addon);
            addon.appendChild(icon);

            div.appendChild(anchor);
            anchor.appendChild(catName);
            anchor.appendChild(badge);

            //anchor.innerHTML += " " + cat["category-name"];
            badge.innerHTML = taskLength;
            getLastCategory.after(div);
        }
    },
    error: function (result, err, errorThrown) {
        console.log(result);
        console.log(err);
        console.log(errorThrown);
    }
});

var visualizeTasks = function(id) {
    document.getElementsByClassName('main')[0].innerHTML = '';
    var tasks = database.getAllTasksInCategory(id);
    var counter = 0;
    var row = document.createElement('div');
    row.className = 'row';
    var itemsToShow;
    
    if (window.innerWidth >= 992) {
        itemsToShow = 3;
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        itemsToShow = 2;
    } else if (window.innerWidth < 768) {
        itemsToShow = 1;
    }

    document.getElementsByClassName('main')[0].appendChild(row); 
    console.log(itemsToShow);
    for (var i = 0; i < tasks.length; i += 1) {
        if (counter === itemsToShow) {
            row = document.createElement('div');
            row.className = 'row';
            document.getElementsByClassName('main')[0].appendChild(row)
            counter = 0;
        }
        var divCol = document.createElement('div');
        var thumbnail = document.createElement('div');
        var caption = document.createElement('div');
        var htmlTaskNameWrapper = document.createElement('div');
        var htmlTaskName = document.createElement('h5');
        var htmlTaskDueDate = document.createElement('h5');
        var htmlTtaskDueTime = document.createElement('h5');
        var htmlTaskPriority = document.createElement('h5');
        var button = document.createElement('button');

        htmlTaskName.style.display = 'inline';
        
        button.className = 'btn btn-primary show-more';
        thumbnail.className = 'thumbnail';
        caption.className = 'caption';
        divCol.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';
        htmlTaskNameWrapper.className = 'taskNameWrapper';
        htmlTaskName.className = 'taskName';

        var taskname = tasks[i].taskName;
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
            if (taskname.length > 20) {
                substr = taskname.substr(0, 20);
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
        }
        htmlTaskName.innerHTML = taskname;
        htmlTaskDueDate.innerHTML = taskduedate;
        htmlTtaskDueTime.innerHTML = taskduetime;
        htmlTaskPriority.innerHTML = taskpriority;
        
        htmlTaskNameWrapper.appendChild(htmlTaskName);
        row.appendChild(divCol);
        divCol.appendChild(thumbnail);
        thumbnail.appendChild(caption);
        caption.appendChild(htmlTaskNameWrapper);
        caption.appendChild(htmlTaskDueDate);
        caption.appendChild(htmlTtaskDueTime);
        caption.appendChild(htmlTaskPriority);
        console.log(divCol.style)
        // console.log($('.taskName'));
        // console.log($('.taskName').innerWidth());

        // if ($('.taskName')[0].scrollWidth > $('.taskName').outerWidth()) {
        //     console.log('truee');
        // }
        counter += 1;
    }
}


/****** Right side ******/

var selectedDate;

$(document).on('click', '#showRightPicker', function(el) {
   
    // console.log(el.target);
    $(el.target).popover({
        trigger: "manual",
        placement: "left",
        html: true,
        content: `<!-- think it's xss vaulnerable -->
            <div class="calendar-right-side form-group">
                <div class='input-group'>
                    <input id='rightPicker' type='text' class='form-control'>
                    <span class="input-group-addon">
                        <i class="fa fa-th-list" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            `,
    });

    $(el.target).popover("toggle");
    $( "#rightPicker" ).datepicker();
        
    var interval = setInterval(function() {
        if ( $( "#rightPicker" ).val() !== '') {
            selectedDate = $( "#rightPicker" ).val();

            // !!!!!!!! INVOKE HERE THE FUNCTION THAT GETS THE TASKS FROM THE CURRENT DATE !!!!!!!!
            // E.X.: getTasksByDate(selectedDate);

            clearInterval(interval);
            $(".popover").popover("hide");
        }
    }, 3000);
})

$(document).mouseup(function (e) {
    var containerRightSide = $('.popover');
    var calendarRightSide = $('.ui-datepicker');

    if (!containerRightSide.is(e.target) && containerRightSide.has(e.target).length === 0 &&
        !calendarRightSide.is(e.target) && calendarRightSide.has(e.target).length === 0) {
        $(containerRightSide).popover("hide");
    }
    
});

/****** Description MODAL ******/

$(document).on('click', '#modalDescription', function() {
    $('#modalDescriptionBlock').modal('show');
});

$("div[id^='descriptionForm']").each(function() {
    var currentModal = $(this);

    // click next
    currentModal.find('.btn-next').click(function() {
        currentModal.modal('hide');
        currentModal.closest("div[id^='descriptionForm']").nextAll("div[id^='descriptionForm']").first().modal('show')
    });

    // click prev
    currentModal.find('.btn-prev').click(function() {
        currentModal.modal('hide');
        currentModal.closest("div[id^='descriptionForm']").prevAll("div[id^='descriptionForm']").first().modal('show');
    });
});


// !!! IMPORTANT - FOR SOME REASON THE CODE BELOW DOESN'T WORK FOR DYNAMICALLY CREATED ITEMS !!!!
// $(".category").click(function (el) {
//     console.log(el)
// });