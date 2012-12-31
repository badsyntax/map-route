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
    if (callback) {
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
  
  var settings = {
    centerBrowser:1,
    centerScreen:1,
    height:500,
    left:0,
    location:0,
    menubar:0,
    resizable:0,
    scrollbars:0,
    status:0,
    width:500,
    windowName:null,
    windowURL:null,
    top:0,
    toolbar:0
  };

  var windowFeatures = 'height=' + settings.height +
    ',width=' + settings.width +
    ',toolbar=' + settings.toolbar +
    ',scrollbars=' + settings.scrollbars +
    ',status=' + settings.status + 
    ',resizable=' + settings.resizable +
    ',location=' + settings.location +
    ',menuBar=' + settings.menubar;

  settings.windowName = elem.name || settings.windowName;
  settings.windowURL = elem.href || settings.windowURL;

  var centeredY,centeredX, w;

  if(settings.centerBrowser){
      
    if ($.browser.msie) {//hacked together for IE browsers
      centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (settings.height/2)));
      centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (settings.width/2)));
    }else{
      centeredY = window.screenY + (((window.outerHeight/2) - (settings.height/2)));
      centeredX = window.screenX + (((window.outerWidth/2) - (settings.width/2)));
    }
    w = window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY);
  }else if(settings.centerScreen){
    centeredY = (screen.height - settings.height)/2;
    centeredX = (screen.width - settings.width)/2;
    w = window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY);
  }else{
    w = window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + settings.left +',top=' + settings.top);  
  }
  w.focus();
  this.curWindow = w;
};