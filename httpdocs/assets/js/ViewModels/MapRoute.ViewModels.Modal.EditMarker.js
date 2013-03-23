MapRoute.ViewModels.Modal.EditMarker = function(model) {
  this.model = model;
  this.setObservables();
};

MapRoute.ViewModels.Modal.EditMarker.inherit(MapRoute.ViewModels.Base, {
  setObservables: function() {
    this.values({
      pendingRequest: false,
      photos: [],
      state: 'list',
      viewPhoto: false
    })
  },
  loadPhotos: function() {

    var self = this;

    this.viewPhoto(false);
    this.pendingRequest(true);

    new MapRoute.Models.Photo().where('marker_id', this.model.id()).findAll(function() {
      self.pendingRequest(false);
      self.photos(this.photos());
    });
  },
  removePhoto: function(photo, callback) {
    photo.remove(callback);
  },
  save: function() {
    this.model.save();
  }
});