/*
    Add class 'ascending' to sort button ('#sort-alphabeth-all') and remove it with 'descending'
    after function (getSortedAlphabetically) is executed.
    Based on boolean true and false into this getSortedAlphabetically() sorting order is changed.
*/

var sortAllTasks = function () {
    $('#sort-alphabeth-all').on('click', function () {
        var $sort = $('#sort-alphabeth-all');
        var result;
        if ($sort.hasClass('ascending')) {
            result = database.getSortedAlphabetically(true);
            $sort.removeClass('ascending');
            $sort.addClass('descending');
        } else {
            result = database.getSortedAlphabetically(false);
            $sort.removeClass('descending');
            $sort.addClass('ascending');
        }
        visualize.customTasks(result);
    });
}

/*
    Sorting by dateTime and visualize all tasks
*/

($('#sort-due-date').on('click', function () {
    var result = database.getSortedByDateAndTime();
    visualize.customTasks(result);
}))();