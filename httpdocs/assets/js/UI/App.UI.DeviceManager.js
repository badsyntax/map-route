App.UI.DeviceManager = function() {
  App.Events.call(this);
  this.winResizeTimer = null;
  this.dimensions = {};
  this.getElements();
  this.bindEvents();
  this.onWinResize();
};

App.inherits(App.UI.DeviceManager, App.Events);

App.UI.DeviceManager.prototype.getElements = function() {
  this.win = $(window);
  this.on('updateDimensions', this.updateDimensions.bind(this));
};

App.UI.DeviceManager.prototype.bindEvents = function() {
  this.win.on('resize', this.onWinResize.bind(this));
};

App.UI.DeviceManager.prototype.isMobile = function() {
  return this.dimensions.width < 480;
};

App.UI.DeviceManager.prototype.isTablet = function() {
  return this.dimensions.width < 768;
};

App.UI.DeviceManager.prototype.updateDimensions = function() {
  this.dimensions.width = this.win.width();
  this.dimensions.height = this.win.width();
};

App.UI.DeviceManager.prototype.onWinResize = function(e) {
  clearTimeout(this.winResizeTimer);
  this.winResizeTimer = setTimeout(function() {
    this.trigger('updateDimensions');
  }.bind(this), 200);
};