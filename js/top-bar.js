/* eslint-disable */
/*
    Using jQuery click method to show datepicker, take value from picked cell
    and store it into variable(selectedDate).
*/
var selectedDate;
$(document).on('click', '#showRightPicker', function(el) {
   
    /*  Dynamically created div showing popover */
    
    $(el.target).popover({
        trigger: 'manual',
        placement: 'left',
        html: true,
        content: `<!-- think it's xss vaulnerable -->
            <div class="calendar-right-side form-group">
                <div class='input-group'>
                    <input id='rightPicker' type='text' class='form-control'>
                    <span class="input-group-addon">
                        <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            `,
    });

    /*  Hidding element by clicking */

    $(el.target).popover('toggle');

    // invoke datepicker
    $( '#rightPicker' ).datepicker();
    
    /*  Set interval, take datepicker's value and hiding datepicker */

    var interval = setInterval(function() {
        if ( $( '#rightPicker' ).val() !== '') {
            selectedDate = $( '#rightPicker' ).val();
            var result = database.findTaskByDate(selectedDate);
            clearInterval(interval);
            $('.popover').popover('hide');
            visualize.customTasks(result);
        }
    }, 3000);
});

$(document).mouseup(function (e) {
    var containerRightSide = $('.popover.left');
    var calendarRightSide = $('.ui-datepicker');

    if (!containerRightSide.is(e.target) && containerRightSide.has(e.target).length === 0 &&
        !calendarRightSide.is(e.target) && calendarRightSide.has(e.target).length === 0) {
        $(containerRightSide).popover('hide');
    }
});

/*
    Show information from both modal forms and hide each one after next or prev buttons
    are executed.
*/

$(document).on('click', '#modalDescription', function() {
    $('#modalDescriptionBlock').modal('show');
});

$("div[id^='descriptionForm']").each(function() {
    var currentModal = $(this);

    // click next
    currentModal.find('.btn-next').click(function() {
        currentModal.modal('hide');
        currentModal.closest("div[id^='descriptionForm']").nextAll("div[id^='descriptionForm']").first().modal('show')
    });

    // click prev
    currentModal.find('.btn-prev').click(function() {
        currentModal.modal('hide');
        currentModal.closest("div[id^='descriptionForm']").prevAll("div[id^='descriptionForm']").first().modal('show');
    });
});

// controlling navbar dropdowns
$('.drop-date a').on("click", function (e) {
    $('.drop-alpha ul').hide();
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
});

$('.sub-option a').on('click', function () {
    $('#parent-dropdown').toggle();
    $('.drop-alpha ul').hide();
    $('.drop-date ul').hide();
});

$('#parent-toggle').on('click', function () {
    $('#parent-dropdown').toggle();
});

$(document).mouseup(function (e) {
    var container1 = $('.drop-alpha a');
    var container2 = $('.drop-date a');
    if (!container1.is(e.target) && container1.has(e.target).length === 0 &&
        !container2.is(e.target) && container2.has(e.target).length === 0) {
        $('.drop-alpha ul').hide();
        $('.drop-date ul').hide();
    }
});
$(document).mouseup(function (e) {
    var container = $('#parent-dropdown');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});


