App.UI.Sidebar = function(container, viewModel) {
  this.container = container.find('.toolbar').fadeIn();
  this.viewModel = viewModel;
  this.search = new App.UI.Sidebar.Search(container);
  this.bindEvents();

  $('#sidebar-tabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
};

App.UI.Sidebar.prototype.bindEvents = function() {
  this.container.on('click', 'button', this.onButtonClick.bind(this));
};

App.UI.Sidebar.prototype.onButtonClick = function(e) {
};