App.UI.Sidebar = function(container, viewModel) {
  this.container = container;
  this.viewModel = viewModel;
  this.search = new App.UI.Sidebar.Search(container);
  this.initTabs();
  this.initScrollbar();
  this.bindEvents();

  this.container.find('[rel="tooltip"]').tooltip();
};

App.UI.Sidebar.prototype.initTabs = function() {
  $('#sidebar-tabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
};

App.UI.Sidebar.prototype.initScrollbar = function() {
  this.scrollBar = $('#sidebar-route').tinyscrollbar({size: 'auto' }).data('tsb');
};

App.UI.Sidebar.prototype.bindEvents = function() {
  $(window).on('resize', this.onWindowResize.bind(this));
};

App.UI.Sidebar.prototype.onWindowResize = function() {
  this.scrollBar.update();
};