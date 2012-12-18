App.ViewModels.Search = function(container) {
  this.container = container;
};

App.ViewModels.Search.prototype.values = function(data) {
  ko.mapping.fromJS(data, null, this);
};

App.ViewModels.Search.prototype.rendered = function() {
  this.ui = new App.UI.Search(this.container, this);
};