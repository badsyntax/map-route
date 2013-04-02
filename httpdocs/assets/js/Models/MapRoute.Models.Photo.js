MapRoute.Models.Photo = function() {

  MapRoute.Models.Base.apply(this, arguments);

  this.api = MapRoute.API.Photo;
  this.s3Url = 'http://' + MapRoute.Config.get('hosts.photos') + '/';

  this.origPath = ko.computed(this.getOrigPath, this);
  this.thumbPath = ko.computed(this.getThumbPath, this);
  this.screenPath = ko.computed(this.getScreenPath, this);
};

MapRoute.Models.Photo.inherit(MapRoute.Models.Base, {
  getThumbPath: function() {
    if (!this.thumb_filename) {
      return null;
    }
    return this.s3Url + this.thumb_filename();
  },
  getScreenPath: function() {
    if (!this.screen_filename) {
      return null;
    }
    return this.s3Url + this.screen_filename();
  },
  getOrigPath: function() {
    if (!this.screen_filename) {
      return null;
    }
    return this.s3Url + this.filename();
  },
  findAll: function(success, error) {
    return this.api.findAll({
      data: this.where(),
      success: success.bind(this),
      error: error,
      mapResponse: {
        model: this,
        mappingOptions: {
          'photos': {
            create: function(options) {
              return new MapRoute.Models.Photo(options.data);
            }
          }
        }
      }
    });
  }
});
