/*
    Preloader function: hides HTML body content, preloader and show login form.
*/

var preLoader = (function() {
    $('.container').hide();
    
    // Set timeout during loading html content
    setTimeout(function () {
        $('#preloader').hide();
        $('#loginModal').modal('show');
    }, 500);
})();