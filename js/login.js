/* eslint-disable */

/****** Login MODAL ******/
$('#loginModal').modal('show');
/****** Greetings login value ******/
$(document).on("click", "#login-button", function () {
    $('#loginModal').modal('hide');
    var userName = $('#username').val();
    var wrapper = document.getElementById("greeetings-content");
    wrapper.getElementsByClassName("modal-content-heading")[0].innerHTML = "Welcome to X-it-out, " + userName + " !!!"
    wrapper.getElementsByClassName("modal-content-body")[0].innerText = "We're glad that you're with us, let's start :)";
    $('#greetings-modal').modal('show');
    var userHTML = document.createElement('span');
    userHTML.innerHTML = userName;
    document.getElementById('user').appendChild(userHTML);
});

$(document).on("click", "#btn_ok", function () {
    $('#greetings-modal').modal('hide');
});