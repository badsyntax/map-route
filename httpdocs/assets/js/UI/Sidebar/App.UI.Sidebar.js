App.UI.Sidebar = function(container, viewModel) {
  this.container = container;
  this.viewModel = viewModel;
  this.search = new App.UI.Sidebar.Search(container);
  this.bindEvents();
  this.initTabs();
};

App.UI.Sidebar.prototype.bindEvents = function() {
  this.container.on('click', '#sidebar-route .nav a', this.onButtonClick.bind(this));
};

App.UI.Sidebar.prototype.initTabs = function() {
  $('#sidebar-tabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
};

App.UI.Sidebar.prototype.onButtonClick = function(e) {
  e.preventDefault();
  var marker = ko.dataFor(e.currentTarget);
  marker.focus();
};