/* Sign In controller
 *************************/
App.Controllers.SignIn = function() {
  this.bindEvents();
};

App.Controllers.SignIn.prototype.bindEvents = function() {
  $('#btn-signin').on('click', this.onButtonClick.bind(this));
};

App.Controllers.SignIn.prototype.onButtonClick = function(e) {
  e.preventDefault();
  $('#btn-signin').hide();
  $('#signin-buttons').css('display', 'inline-block').animate({
    opacity: 1
  });
};