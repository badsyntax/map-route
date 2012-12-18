/* Search UI
 *************************/
App.UI.Search = function(container, viewModel) {
  this.container = container;
  this.viewModel = viewModel;
  this.element = this.container.find('.search');
  this.field = this.container.find('input[type=text]');
  this.updatePosition();
};

App.UI.Search.prototype.updatePosition = function() {
  this.element.css({
    marginLeft: -1 * (this.element.width() / 2) - 10
  });
};

App.UI.Search.prototype.show = function() {
  this.element.fadeIn();
  this.field.focus();
};

App.UI.Search.prototype.reset = function() {
  this.element.hide();
  this.field.val('');
}