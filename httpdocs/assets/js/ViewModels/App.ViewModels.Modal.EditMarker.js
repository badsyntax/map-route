App.ViewModels.Modal.EditMarker = function(model) {
  this.setObservables(model);
};

App.ViewModels.Modal.EditMarker.inherit(App.ViewModels.Base, {
  setObservables: function(model) {
    this.values({
      model: model,
      photos: []
    })
  }  
});