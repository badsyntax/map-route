MapRoute.ViewModels.Modal.EditMarker = function(model) {
  this.setObservables(model);
};

MapRoute.ViewModels.Modal.EditMarker.inherit(MapRoute.ViewModels.Base, {
  setObservables: function(model) {
    this.values({
      pendingRequest: false,
      model: model,
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
  }
});