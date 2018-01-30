$('#sort-alphabeth').on('click', function() {
    var $sort = $('#sort-alphabeth');
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
    //console.log(result);
});