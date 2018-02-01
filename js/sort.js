/* eslint-disable */

var sortAllTasks = function() {
    $('#sort-alphabeth-all').on('click', function() {
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

// Sorting by due date

    $('#sort-due-date').on('click', function() {
        var $sortDueDate = $('#sort-due-date');
        var result;
        if ($sortDueDate.hasClass('ascending')) {
            result = database.getSortedByDueDate(true);
            $sortDueDate.removeClass('ascending');
            $sortDueDate.addClass('descending');
        } else {
            result = database.getSortedByDueDate(false);
            $sortDueDate.removeClass('descending');
            $sortDueDate.addClass('ascending');
        }
        visualize.customTasks(result);
    });
