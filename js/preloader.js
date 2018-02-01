var preLoader = (function() {
    $('.container').hide();
    setTimeout(function () {
        $('#preloader').hide();
        $('#loginModal').modal('show');
    }, 500);
})();