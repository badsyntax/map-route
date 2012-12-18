/* Toolbar UI
 *************************/
App.UI.Toolbar = function(container, viewModel) {
  this.container = container.find('.toolbar').fadeIn();
  this.viewModel = viewModel;
  this.position();
  this.bindEvents();
  this.onUpdateDimensions();
  this.initTooltips();
};

App.UI.Toolbar.prototype.position = function() {
  this.container.css({
    marginLeft: -1 * Math.round(this.container.width() / 2)
  });
};

App.UI.Toolbar.prototype.bindEvents = function() {
  this.container.on('click', 'button', this.onButtonClick.bind(this));

  App.UI.Device
  .on('updateDimensions.toolbar', this.onUpdateDimensions.bind(this));
};

App.UI.Toolbar.prototype.onUpdateDimensions = function() {
  if (App.UI.Device.isMobile()) {
    this.container.find('.btn-group').addClass('btn-group-vertical');
  } else {
    this.container.find('.btn-group').removeClass('btn-group-vertical');
  }
};

App.UI.Toolbar.prototype.onButtonClick = function(e) {
  this.viewModel.executeAction(e, ko.dataFor(e.currentTarget));
};

App.UI.Toolbar.prototype.initTooltips = function() {
  this.container.find('[rel="tooltip"]').tooltip({});
};