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

var sortCategory = function(catId) {
    // $('#sort-alphabeth-in-cat').on('click');
    $('#sort-alphabeth-in-cat').on('click', function() {
        console.log('clicked ' + catId);
        var $sort = $('#sort-alphabeth-in-cat');
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
       // $('#sort-alphabeth-in-cat').off('click');
    });
}


