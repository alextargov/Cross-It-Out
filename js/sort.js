/* eslint-disable */

/**
  * @desc By clicking $('.sort-alphabeth-all') execute sorting in increasing or decreasing order. 
  * By so class 'ascending' in sort button is changed with 'descending'.
  * @param bool - true or false in getSortedAlphabetically() or getSortedAlphabeticallyInCategory(catId).
  * @return visualize.customTasks().
*/

(function () {
    $('.sort-alphabeth-all').on('click', function () {
        var $sort = $(this);
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
    
    $('#sort-alphabeth-in-cat').on('click', function () {
        var catId = sharedState.categoryId;
        var $sort = $(this);
        var result;
        if ($sort.hasClass('ascending')) {
            result = database.getSortedAlphabeticallyInCategory(catId, true);
            $sort.removeClass('ascending');
            $sort.addClass('descending');
        } else {
            result = database.getSortedAlphabeticallyInCategory(catId, false);
            $sort.removeClass('descending');
            $sort.addClass('ascending');
    
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
        var result = database.getSortedByDateAndTime(catId);
        visualize.customTasks(result);
    });
})();
