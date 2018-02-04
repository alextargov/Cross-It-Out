/* eslint-disable */
$('.search-div').hide();
// --- gets the info from the JSON file and appends it to the UI ---
$.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'json/resources.json',
    success: function (result) {
        userCategories = result.clients[0].categories;
        for (var i = 0; i < userCategories.length; i += 1) {
            var cat = userCategories[i];

            var taskLength = cat.tasks.length;
            var getLastCategory = $('.category').last()[0];
            var anchor = document.createElement('a');
            var icon = document.createElement('i');
            var badge = document.createElement('span');
            var addon = document.createElement('span');
            var catName = document.createElement('span');
            var div = document.createElement('div');

            var nextId = +getLastCategory.id + 1;

            database.addCategory(nextId);

            $.each(cat.tasks, function (index, value) {
                database.addTask(nextId, value);
            });

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
            catName.innerHTML += ' ' + cat.categoryName;

            div.appendChild(addon);
            addon.appendChild(icon);

            div.appendChild(anchor);
            anchor.appendChild(catName);
            anchor.appendChild(badge);

            badge.innerHTML = taskLength;
            getLastCategory.after(div);
        }
    },
    error: function (result, err, errorThrown) {
        console.log(result);
        console.log(err);
        console.log(errorThrown);
    }, beforeSend: function() {

        
        var preLoader = (function() {
            $('#preloader').show();
            $('.container').hide();
            // Set timeout during loading html content
            setTimeout(function () {
                $('.logo').show();
                $('#preloader').hide();
                $('#loginModal').modal('show');
            }, 500);
        })();
    }
});

