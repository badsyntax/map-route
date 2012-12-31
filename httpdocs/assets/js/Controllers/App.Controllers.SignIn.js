/* Sign In controller
 *************************/
App.Controllers.SignIn = function() {
  this.signinButtons = $('#signin-buttons');
  this.signinButton = $('#btn-signin');
  this.overlay = $('#auth-overlay');
  this.bindEvents();
};

App.Controllers.SignIn.prototype.bindEvents = function() {
  this.signinButton.on('click', this.onSigninButtonClick.bind(this));
  this.signinButtons.on('click', 'a', this.onSigninButtonsClick.bind(this));
  this.overlay.on('click', this.hideOverlay.bind(this));
};

App.Controllers.SignIn.prototype.onSigninButtonClick = function(e) {
  e.preventDefault();
  this.signinButton.hide();
  this.signinButtons.css('display', 'inline-block').animate({
    opacity: 1
  });
};

App.Controllers.SignIn.prototype.onSigninButtonsClick = function(e) {
  e.preventDefault();
  this.showOverlay();
  this.openWindow(e.currentTarget);
};

App.Controllers.SignIn.prototype.showOverlay = function() {
  this.overlay.css({
    opacity: 0,
    display: 'block',
    visibility: 'visible'
  }).animate({
    opacity: 0.8
  });
};

App.Controllers.SignIn.prototype.hideOverlay = function(callback) {
  this.overlay.animate({
    opacity: 0
  }, function() {
    $(this).hide();
    if ($.isFunction(callback)) {
      callback();
    }
  });
};

App.Controllers.SignIn.prototype.onAuthSuccess = function(e) {
  this.curWindow.close();
  this.hideOverlay(function() {
    location.reload();
  });
};

App.Controllers.SignIn.prototype.onAuthFail = function() {
  console.log('Auth fail');
};

App.Controllers.SignIn.prototype.openWindow = function(elem) {

  $(window.document).one('authsuccess', this.onAuthSuccess.bind(this));
  $(window.document).one('authfail', this.onAuthFail.bind(this));

  var width = 500;
  var height = 500;
  var windowName = 'signin';
  var windowURL = elem.href;
  
  var windowFeatures = 'height=' + height +
    ',width=' + width +
    ',toolbar=' + 0 +
    ',scrollbars=' + 0 +
    ',status=' + 0 + 
    ',resizable=' + 0 +
    ',location=' + 0 +
    ',menuBar=' + 0;

  var centeredY,centeredX, w;

  if ($.browser.msie) {//hacked together for IE browsers
    centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (height/2)));
    centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));
  } else {
    centeredY = window.screenY + (((window.outerHeight/2) - (height/2)));
    centeredX = window.screenX + (((window.outerWidth/2) - (width/2)));
  }

  w = window.open(windowURL, windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY);
  w.focus();
  w.onbeforeunload = this.hideOverlay.bind(this);
  this.curWindow = w;
};