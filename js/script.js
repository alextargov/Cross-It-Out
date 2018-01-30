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
        visualize.allTasks();
    },
    error: function (result, err, errorThrown) {
        console.log(result);
        console.log(err);
        console.log(errorThrown);
    }
});

/****** Right side ******/

var selectedDate;

$('#showRightPicker').on('click', function(el) {
   
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
});

$(document).mouseup(function (e) {
    var containerRightSide = $('.popover.left');
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





// var ONE_MINUTE = 60 * 1000;

// function showTime() {
//   console.log(new Date());
// }

// setInterval(showTime, ONE_MINUTE);

// function repeatEvery(func, interval) {
//     // Check current time and calculate the delay until next interval
//     var now = new Date(),
//         delay = interval - now % interval;

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