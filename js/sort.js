/*
    Add class 'ascending' to sort button ('#sort-alphabeth-all') and remove it with 'descending'
    after function (getSortedAlphabetically) is executed.
    Based on boolean true and false into this getSortedAlphabetically() sorting order is changed.
*/

$('.sort-alphabeth-all').on('click', function () {
    console.log(this);
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
    console.log(sharedState)
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
});


/*
    Sorting by dateTime and visualize all tasks
*/

$('#sort-due-date').on('click', function () {
    var result = database.getSortedByDateAndTime();
    visualize.customTasks(result);
});

$('.drop-alpha a').on("click", function (e) {
    $('.drop-date ul').hide();
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
});
