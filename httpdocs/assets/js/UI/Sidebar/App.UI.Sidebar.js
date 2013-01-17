App.UI.Sidebar = function(container, viewModel) {

  this.container = container;
  this.viewModel = viewModel;
  this.search = new App.UI.Sidebar.Search(container);

  this.initTabs();
  this.container.find('[rel="tooltip"]').tooltip();

  this.bindEvents();
};

App.UI.Sidebar.prototype.initTabs = function() {
  $('#sidebar-tabs a')
  .on('click', this.onTabClick.bind(this))
  .eq(0)
  .trigger('click');
};

App.UI.Sidebar.prototype.onTabClick = function (e) {

  e.preventDefault();

  var elem = $(e.target).tab('show')
 
  var selector = elem
    .attr('href')
    .replace(/.*(?=#[^\s]*$)/, '') //strip for ie7

  this.scrollBar = $(selector).tinyscrollbar({size: 'auto' }).data('tsb');
};

App.UI.Sidebar.prototype.bindEvents = function() {
  $(window).on('resize', this.onWindowResize.bind(this));
  App.GlobalEvents.on([
    'removemarker',
    'addmarker',
    'removepoint',
    'addpoint'
  ].join(' '), this.onWindowResize.bind(this));
};

App.UI.Sidebar.prototype.onWindowResize = function() {
  this.scrollBar.update();
};