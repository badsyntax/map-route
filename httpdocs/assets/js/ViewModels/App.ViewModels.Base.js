MapRoute.ViewModels.Base = function() {};

MapRoute.ViewModels.Base.prototype = {
  values: function(data) {
    return (data) ? ko.mapping.fromJS(data, null, this) : ko.mapping.toJS(this);
  }
};