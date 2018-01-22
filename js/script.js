/* eslint-disable */
$(document).ready(function () {
    $(function () {
        $('#datetimepicker3').datetimepicker({
            format: 'LT'
        });
    });
    
    var userCategories;
    var information = {0: []};
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "json/resources.json",
        success: function (result) {
            userCategories = result.clients[0].categories;
            for (var i = 0; i < userCategories.length; i += 1) {
                var cat = userCategories[i];
                // var currId = 
                // console.log(cat.tasks);

                var taskLength = cat.tasks.length;
                var getLastCategory = $(".category").last()[0];
                var anchor = document.createElement("a");
                var icon = document.createElement("i");
                var badge = document.createElement("span");

                information[+getLastCategory.id + 1] = [];
                $.each(cat.tasks, function(index,value) {
                    information[+getLastCategory.id + 1].push(value);
                });

                anchor.setAttribute("href", "#");
                anchor.setAttribute("data-toggle", "popover");
                anchor.className += "category list-group-item";
                anchor.id = +getLastCategory.id + 1;
                icon.className += " fa fa-plus";
                badge.className += " badge";

                anchor.appendChild(icon);
                anchor.innerHTML += " " + cat["category-name"];
                badge.innerHTML = taskLength;
                anchor.appendChild(badge);
                // getLastCategory.after(anchor);
                getLastCategory.after(anchor);
            }
            console.log(information);
        },
        error: function (result, err, errorThrown) {
            console.log(result);
            console.log(err);
            console.log(errorThrown);
        }
    });
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
            badge.innerHTML = 0;

            anchor.append(icon);
            anchor.innerHTML += " " + value;
            anchor.append(badge);
            getLastCategory.after(anchor);

            information[+getLastCategory.id + 1] = [];
            $(".category-input").val("");
        }
    });

    $(document).on("click", ".category", function(el) {
        var re = /\b[a-zA-Z0-9]\w+/g;
        var title = el.target.innerText.match(re).join(' ')
        console.log(el.target.id);

        $(el.target).popover({
            trigger: "manual",
            placement: "bottom",
            html: true,
            title: title, 
            content: 
            ` <!-- think it's xss vaulnerable -->
            <div class="form-group">
                <div class='input-group'>
                    <input id='add-task' type='text' class='form-control'>
                    <span class="input-group-addon">
                    <i class="fa fa-th-list" aria-hidden="true"></i>
                    </span>
                </div>
                <br>
                <div class='input-group date' >
                    <input type='text' class="form-control" id='datetimepicker' />
                    <span class="input-group-addon">
                        <i class="fa fa-clock"></i>
                    </span>
                </div>
                <div class="input-group">
                    <select class="form-control" id="inputGroupSelect01">
                        <option selected>Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <br>
                <button class="btn btn-primary" id="add-task">Add task</button>
            </div>
            `,
        });
        
        $(el.target).popover("toggle");
        $('#datetimepicker').timepicker({
            'timeFormat': 'H:i',
            'step': 30,
            'disableTimeRanges': [
                ['00:00', (new Date().getHours())+ ':' + new Date().getMinutes()],
            ]
        });
    });
    
    // !!! IMPORTANT - FOR SOME REASON THE CODE BELOW DOESN'T WORK FOR DYNAMICALLY CREATED ITEMS !!!!
    // $(".category").click(function (el) {
    //     console.log(el)
    // });
});
