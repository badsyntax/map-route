/* Sign In controller
 *************************/
App.Controllers.SignIn = function() {
  this.signinButtons = $('#signin-buttons');
  this.signinButton = $('#btn-signin');
  this.overlay = $('#auth-overlay');
  this.bindEvents();
};

App.Controllers.SignIn.prototype = {
  bindEvents: function() {
    this.signinButton.on('click', this.onSigninButtonClick.bind(this));
    this.signinButtons.on('click', 'a', this.onSigninButtonsClick.bind(this));
    this.overlay.on('click', this.hideOverlay.bind(this));
  },
  onSigninButtonClick: function(e) {
    e.preventDefault();
    this.signinButton.hide();
    this.signinButtons.css('display', 'inline-block').animate({
      opacity: 1
    });
  },
  onSigninButtonsClick: function(e) {
    e.preventDefault();
    this.openWindow(e.currentTarget);
    this.showOverlay();
  },
  showOverlay: function(callback) {
    this.overlay.css({
      opacity: 0,
      display: 'block',
      visibility: 'visible'
    }).animate({
      opacity: 0.8
    }, callback);
  },
  hideOverlay: function(callback) {
    this.overlay.animate({
      opacity: 0
    }, function() {
      $(this).hide();
      if ($.isFunction(callback)) {
        callback();
      }
    });
  },
  onAuthSuccess: function(e) {
    this.curWindow.close();
    this.hideOverlay(function() {
      location.reload();
    });
  },
  onAuthFail: function() {
    console.log('Auth fail');
  },
  openWindow: function(elem) {

    $(window.document).one('authsuccess', this.onAuthSuccess.bind(this));
    $(window.document).one('authfail', this.onAuthFail.bind(this));

    var width = 500;
    var height = 500;
    var windowName = 'signin';
    var windowURL = elem.href;

    var centeredY = (window.screenY || 0) + (((window.outerHeight/2) - (height/2)));
    var centeredX = (window.screenX || 0) + (((window.outerWidth/2) - (width/2)));

    var windowFeatures = [
      'height=' + height,
      'left=' + centeredX,
      'top=' + centeredY,
      'width=' + width,
      'toolbar=0',
      'scrollbars=0',
      'status=0',
      'resizable=0',
      'location=0',
      'menuBar=0'
    ].join(',');

    var win = window.open(windowURL, windowName, windowFeatures);
    this.curWindow = win;
    win.focus();
    
    // Hide the overlay when the window closes
    (function poll(timer) {
      if (win.closed) {
        this.hideOverlay()
        return clearTimeout(timer);
      }
      timer = setTimeout(poll.bind(this), 220);
    }.bind(this)(0));
  }
};