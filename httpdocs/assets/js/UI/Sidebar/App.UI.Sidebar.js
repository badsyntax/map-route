MapRoute.UI.Sidebar = function(container, viewModel) {

  this.container = container;
  this.viewModel = viewModel;
  this.search = new MapRoute.UI.Sidebar.Search(container);

  this.initTabs();
  this.container.find('[rel="tooltip"]').tooltip();

  this.bindEvents();
};

MapRoute.UI.Sidebar.prototype = {
  initTabs: function() {
    $('#sidebar-tabs a')
    .on('click', this.onTabClick.bind(this))
    .eq(0)
    .trigger('click');
  },
  onTabClick: function (e) {

    e.preventDefault();

    $(e.target).tab('show');

    this.scrollBarElem = $(
      e.target
      .href
      .replace(/.*(?=#[^\s]*$)/, '')
    ).tinyscrollbar({size: 'auto' });
    this.scrollBar = this.scrollBarElem.data('tsb');
  },
  bindEvents: function() {
    $(window).on('resize', this.onWindowResize.bind(this));
    MapRoute.GlobalEvents.on([
      'removemarker',
      'addmarker',
      'removepoint',
      'addpoint'
    ].join(' '), this.onWindowResize.bind(this));

    MapRoute.GlobalEvents.on('ajax.msg.success', this.onAjaxSuccess.bind(this));
  },
  onWindowResize: function() {
    this.scrollBar.update('relative');
  },
  onAjaxSuccess: function() {
    this.viewModel.ajaxSuccessMessage(true)
  }
};