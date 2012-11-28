<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Map Route</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Map route" />
  <meta name="author" content="Richard Willis" />
  <meta name="viewport" content="initial-scale=1.0,user-scalable=no,width=device-width" />
  <link rel="stylesheet" type="text/css" href="/assets/lib/bootstrap/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="/assets/lib/fontawesome/css/font-awesome.css" />
  <link rel="stylesheet" type="text/css" href="/assets/css/screen.css" />
  <script>
    document.documentElement.className='js';
  </script>
</head>
<body>

  <?php echo $content; ?>

  <script src="/assets/lib/jquery/jquery-1.8.3.min.js"></script>
  <script src="/assets/lib/bootstrap/js/bootstrap.min.js"></script>
  <script src="/assets/lib/knockout/knockout-2.2.0.js"></script>
  <script src="/assets/lib/knockout/knockout.mapping-2.3.4.js"></script>
  <script src="/assets/js/App.js"></script>
  <script src="/assets/js/Events/App.Events.js"></script>
  <script src="/assets/js/Config/App.Config.js"></script>
  <script src="/assets/js/API/App.API.Base.js"></script>
  <script src="/assets/js/API/App.API.Marker.js"></script>
  <script src="/assets/js/Map/App.Map.js"></script>
  <script src="/assets/js/Map/App.Map.Marker.js"></script>
  <script src="/assets/js/Map/App.Map.InfoWindow.js"></script>
  <script src="/assets/js/Map/Actions/App.Map.Actions.Default.js"></script>
  <script src="/assets/js/Map/Actions/App.Map.Actions.AddMarker.js"></script>
  <script src="/assets/js/Map/Actions/App.Map.Actions.AddRoute.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Map.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Modal.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Modal.Login.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Modal.EditMarkerDescription.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Toolbar.js"></script>
  <script src="/assets/js/UI/App.UI.Toolbar.js"></script>
  <script src="/assets/js/UI/App.UI.Modal.js"></script>
  <script src="/assets/js/UI/App.UI.Modal.Login.js"></script>
  <script src="/assets/js/UI/App.UI.Modal.EditMarkerDescription.js"></script>
  <script src="/assets/js/Models/App.Models.Base.js"></script>
  <script src="/assets/js/Models/App.Models.ToolbarButton.js"></script>
  <script src="/assets/js/Models/App.Models.Marker.js"></script>
  <script src="/assets/js/ViewModels/App.ViewModels.Toolbar.js"></script>
  <script src="/assets/js/ViewModels/App.ViewModels.Modal.js"></script>
  <script src="/assets/js/ViewModels/App.ViewModels.Modal.Login.js"></script>
  <script src="/assets/js/ViewModels/App.ViewModels.Modal.EditMarkerDescription.js"></script>
  <script>
  App.Config.set(<?php echo $front_end_config; ?>);
  new App.Controllers.Map();
  </script>
</body>
</html>