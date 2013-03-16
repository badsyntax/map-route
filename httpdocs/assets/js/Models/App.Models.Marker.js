MapRoute.Models.Marker = function() {
  MapRoute.Models.Base.apply(this, arguments);
  this.api = MapRoute.API.Marker;
};

MapRoute.Models.Marker.inherit(MapRoute.Models.Base, {
  fields: {
    user_id: 0,
    latitude: 0,
    longitude: 0,
    title: '',
    description: '',
    location: '',
    date: null,
    route_id: 0,
    route_order: -1
  },
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
    MapRoute.API.Marker.findAll({
      data: this.where(),
      success: success.bind(this),
      error: error,
      mapResponse: {
        model: this,
        mappingOptions: {
          'markers': {
            create: function(options) {
              var t = new MapRoute.Models.Marker(options.data);
              return t;
            }
          }
        }
      }
    });
  }
});