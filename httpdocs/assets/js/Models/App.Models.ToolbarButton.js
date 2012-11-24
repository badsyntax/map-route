App.Models.ToolbarButton = function(data) {
  this.caption = ko.observable(data.caption);
  this.className = ko.observable(data.className);
  this.iconClassName = ko.observable(data.iconClassName);
  this.action = data.action;
};