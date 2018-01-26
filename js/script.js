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
    
    document.getElementsByClassName('main')[0].appendChild(row); 

    for (var i = 0; i < tasks.length; i += 1) {
        if (counter === 3) {
            row = document.createElement('div');
            row.className = 'row';
            document.getElementsByClassName('main')[0].appendChild(row)
            counter = 0;
        }
        var divCol = document.createElement('div');
        var thumbnail = document.createElement('div');
        var caption = document.createElement('div');
        var htmlTaskName = document.createElement('h5');
        var htmlTaskDueDate = document.createElement('h5');
        var htmlTtaskDueTime = document.createElement('h5');
        var htmlTaskPriority = document.createElement('h5');

        thumbnail.className = 'thumbnail';
        caption.className = 'caption';
        divCol.className = 'col-sm-4 col-md-4';

        var taskname = tasks[i].taskName;
        var taskduedate = tasks[i].taskDueDate;
        var taskduetime = tasks[i].taskDueTime;
        var taskpriority = tasks[i].taskPriority;

        htmlTaskName.innerHTML = taskname;
        htmlTaskDueDate.innerHTML = taskduedate;
        htmlTtaskDueTime.innerHTML = taskduetime;
        htmlTaskPriority.innerHTML = taskpriority;

        row.appendChild(divCol);
        divCol.appendChild(thumbnail);
        thumbnail.appendChild(caption);
        caption.appendChild(htmlTaskName);
        caption.appendChild(htmlTaskDueDate);
        caption.appendChild(htmlTtaskDueTime);
        caption.appendChild(htmlTaskPriority);

        counter += 1;
    }
}

// !!! IMPORTANT - FOR SOME REASON THE CODE BELOW DOESN'T WORK FOR DYNAMICALLY CREATED ITEMS !!!!
// $(".category").click(function (el) {
//     console.log(el)
// });