App.ViewModels.Base = function() {};

App.ViewModels.Base.prototype = {
  values: function(data) {
    return (data) ? ko.mapping.fromJS(data, null, this) : ko.mapping.toJS(this);
  }
};