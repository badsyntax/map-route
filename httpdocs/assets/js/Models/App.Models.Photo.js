App.Models.Photo = function() {

  App.Models.Base.apply(this, arguments);

  this.api = App.API.Photo;
  this.s3Url = 'https://s3-eu-west-1.amazonaws.com/maproute-local-photos/';

  this.thumbPath = ko.computed(this.getThumbPath, this);
  this.screenPath = ko.computed(this.getScreenPath, this);
};

App.Models.Photo.inherit(App.Models.Base, {
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
  findAll: function(success, error) {
    this.api.findAll({
      data: this.where(),
      success: success.bind(this),
      error: error,
      mapResponse: {
        model: this,
        mappingOptions: {
          'photos': {
            create: function(options) {
              return new App.Models.Photo(options.data);
            }
          }
        }
      }
    });
  }
});
