App.UI.Sidebar = function(container, viewModel) {

  this.container = container;
  this.viewModel = viewModel;
  this.search = new App.UI.Sidebar.Search(container);

  this.initTabs();
  this.container.find('[rel="tooltip"]').tooltip();

  this.bindEvents();
};

App.UI.Sidebar.prototype = {
  initTabs: function() {
    $('#sidebar-tabs a')
    .on('click', this.onTabClick.bind(this))
    .eq(0)
    .trigger('click');
  },
  onTabClick: function (e) {

    e.preventDefault();

    $(e.target).tab('show');

    this.scrollBar = $(
      e.target
      .href
      .replace(/.*(?=#[^\s]*$)/, '')
    )
    .tinyscrollbar({size: 'auto' })
    .data('tsb');
  },
  bindEvents: function() {
    $(window).on('resize', this.onWindowResize.bind(this));
    App.GlobalEvents.on([
      'removemarker',
      'addmarker',
      'removepoint',
      'addpoint'
    ].join(' '), this.onWindowResize.bind(this));
  },
  onWindowResize: function() {
    this.scrollBar.update();
  }
};