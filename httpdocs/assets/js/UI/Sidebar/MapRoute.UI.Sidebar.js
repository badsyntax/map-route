MapRoute.UI.Sidebar = function(container, viewModel) {

  this.container = container;
  this.viewModel = viewModel;

  this.search = new MapRoute.UI.Sidebar.Search(container);

  this.container.find('[rel="tooltip"]').tooltip();

  this.bindEvents();
};

MapRoute.UI.Sidebar.prototype = {
  bindEvents: function() {
    MapRoute.GlobalEvents.on('api.request.success', this.onApiSuccess.bind(this));
  },
  onApiSuccess: function() {
    this.viewModel.ajaxSuccessMessage(true)
  }
};