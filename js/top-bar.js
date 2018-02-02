/* eslint-disable */

var selectedDate;

$(document).on('click', '#showRightPicker', function(el) {
    var tasks;
    // console.log(el.target);
    $(el.target).popover({
        trigger: "manual",
        placement: "left",
        html: true,
        content: `<!-- think it's xss vaulnerable -->
            <div class="calendar-right-side form-group">
                <div class='input-group'>
                    <input id='rightPicker' type='text' class='form-control'>
                    <span class="input-group-addon">
                        <i class="fa fa-th-list" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            `,
    });

    $(el.target).popover("toggle");
    $( "#rightPicker" ).datepicker();
        
    var interval = setInterval(function() {
        if ( $( "#rightPicker" ).val() !== '') {
            selectedDate = $( "#rightPicker" ).val();
            clearInterval(interval);
            $(".popover").popover("hide");
        }
    }, 3000);
});

$(document).mouseup(function (e) {
    var containerRightSide = $('.popover.left');
    var calendarRightSide = $('.ui-datepicker');

    if (!containerRightSide.is(e.target) && containerRightSide.has(e.target).length === 0 &&
        !calendarRightSide.is(e.target) && calendarRightSide.has(e.target).length === 0) {
        $(containerRightSide).popover("hide");
    }
});

/****** How-to-use / pop-up MODAL ******/

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

sortAllTasks(true);
