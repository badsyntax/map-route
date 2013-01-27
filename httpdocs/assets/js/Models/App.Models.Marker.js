App.Models.Marker = function() {
  App.Models.Base.apply(this, arguments);
  this.api = App.API.Marker;
};

App.Models.Marker.prototype = Object.inherits(App.Models.Base, {
  setObservables: function() {
    this.active = ko.observable(false);
  },
  setComputed: function() {
    this.route_title = ko.computed(this.getRouteTitle, this);
    this.latlng = ko.computed(this.getLatLng, this);
    this.date_formatted = ko.computed({
        read: this.getDateFormatted,
        write: this.setDateFormatted,
        owner: this
    });
  },
  getRouteTitle: function() {
    return this.title() || this.description() || 
      (this.longitude().toFixed(5) + ', ' + this.latitude().toFixed(5));
  },
  getLatLng: function() {
    return this.latitude() + ',' + this.longitude(); 
  },
  setDateFormatted: function(value) {
    var date = (Globalize.parseDate(value)).getTime() / 1000;
    this.date(date);
  },
  getDateFormatted: function() {
    if (!this.date) {
      return;
    }
    return Globalize.format(new Date(parseInt(this.date(), 10) * 1000), 'd');
  },
  findAll: function(success, error) {
    App.API.Marker.findAll({
      data: this.where(),
      success: success.bind(this),
      error: error,
      mapResponse: {
        model: this,
        mappingOptions: {
          'markers': {
            create: function(options) {
              var t = new App.Models.Marker(options.data);
              return t;
            }
          }
        }
      }
    });
  }
});