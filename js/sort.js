/* eslint-disable */
/*
    Add class 'ascending' to sort button ('#sort-alphabeth-all') and remove it with 'descending'
    after function (getSortedAlphabetically) is executed.
    Based on boolean true and false into this getSortedAlphabetically() sorting order is changed.
*/

(function () {
    $('.sort-alphabeth-all').on('click', function () {
        var result;
        if ($(this).hasClass('ascending')) {
            result = database.getSortedAlphabetically(true);
            $(this).removeClass('ascending');
            $(this).addClass('descending');
        } else {
            result = database.getSortedAlphabetically(false);
            $(this).removeClass('descending');
            $(this).addClass('ascending');
        }
        visualize.customTasks(result);
    });
    
    $('#sort-alphabeth-in-cat').on('click', function () {
        var catId = sharedState.categoryId;
        
        if (!catId) {
            visualize.noTasks();
            return;
        }

        var result;
        if ($(this).hasClass('ascending')) {
            result = database.getSortedAlphabeticallyInCategory(catId, true);
            $(this).removeClass('ascending');
            $(this).addClass('descending');
        } else {
            result = database.getSortedAlphabeticallyInCategory(catId, false);
            $(this).removeClass('descending');
            $(this).addClass('ascending');
    
        }
        visualize.customTasks(result);
    });
    
    /*
        Sorting by dateTime and visualize
    */
    
    $('#sort-due-date').on('click', function () {
        var result = database.getSortedByDateAndTime();
        visualize.customTasks(result);
    });
    
    $('#sort-due-date-in-cat').on('click', function () {
        var catId = sharedState.categoryId;
        if (!catId) {
            visualize.noTasks();
            return;
        }
        var result = database.getSortedByDateAndTime(catId);
        visualize.customTasks(result);
    });
})();
