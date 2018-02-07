/* eslint-disable */
// --- gets the info from the JSON file and appends it to the UI ---
$.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'json/resources.json',
    success: function (result) {
        userCategories = result.clients[0].categories;
        visualizaCategories(userCategories);
    },
    error: function (result, err, errorThrown) {
        console.log(result);
        console.log(err);
        console.log(errorThrown);
    },
    beforeSend: function () {
        $('#preloader').show();
        $('.container').hide();
        // Set timeout during loading html content
        setTimeout(function () {
            $('.logo').show();
            $('#preloader').hide();
            $('#loginModal').modal('show');
        }, 500);
    }
});

// events for the delete and done buttons
$('.main').on('click', '.done-icon, .delete-icon', function (doneElement) {
    var el = sharedState.categoryElement;
    var isAll = sharedState.isAll;
    var catId = sharedState.categoryId;
    var buttonId = $(this).attr('id');

    if ($(this).hasClass('delete-icon')) {
        var taskId = buttonId.slice(4);
        database.addtoIncompleted(taskId);
    } else {
        var taskId = buttonId.slice(5);
        database.addToDone(taskId);
    }

    if (isAll) {
        visualize.allTasks();
    } else {
        visualize.tasksInCategory(catId);
    }

    updateBadges();
    var incompletedSum = calculatePoints().incompletedSum;
    var doneSum = calculatePoints().doneSum;
    var pointsResult = doneSum + incompletedSum;
    $('#calculated-points').text(pointsResult);
});