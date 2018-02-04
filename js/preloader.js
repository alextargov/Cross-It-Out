/*
    Preloader function: hides HTML body content, preloader and show login form.
*/
$(document).ready(function() {
    $('.logo').show();
});

var preLoader = (function() {
    $('#preloader').show();
    $('.container').hide();
    // Set timeout during loading html content
    setTimeout(function () {
        $('#preloader').hide();
        $('#loginModal').modal('show');
    }, 500);
})();