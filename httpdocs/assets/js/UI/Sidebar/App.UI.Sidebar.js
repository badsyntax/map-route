App.UI.Sidebar = function(container, viewModel) {
  this.container = container;
  this.viewModel = viewModel;
  this.search = new App.UI.Sidebar.Search(container);
  this.initTabs();
  $('#sidebar-route').tinyscrollbar({size: 'auto' });
};

App.UI.Sidebar.prototype.initTabs = function() {
  $('#sidebar-tabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
};
