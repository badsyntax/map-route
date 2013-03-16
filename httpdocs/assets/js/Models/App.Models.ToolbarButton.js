MapRoute.Models.ToolbarButton = function(data) {

  ko.mapping.fromJS(data, {
    'ignore': [ 'action' ]
  }, this);

  this.action = data.action;
};