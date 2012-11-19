<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Map Route</title>
  <meta name="description" content="Map route" />
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width" />
  <script>
    this.__start=(new Date).getTime();
    document.documentElement.className='js';
  </script>
  <link rel="stylesheet" type="text/css" href="/assets/lib/bootstrap/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
</head>
<body>

  <?php echo $content; ?>

  <script src="/assets/lib/jquery/jquery-1.8.3.min.js"></script>
  <script src="/assets/lib/bootstrap/js/bootstrap.min.js"></script>
  <script src="/assets/lib/knockout/knockout-2.2.0.js"></script>
  <script src="/assets/js/App.js"></script>
  <script src="/assets/js/Config/App.Config.js"></script>
  <script src="/assets/js/Map/App.Map.js"></script>
  <script src="/assets/js/Map/Actions/App.Map.Actions.Default.js"></script>
  <script src="/assets/js/Map/Actions/App.Map.Actions.AddPin.js"></script>
  <script src="/assets/js/Map/Actions/App.Map.Actions.AddRoute.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Map.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Modal.js"></script>
  <script src="/assets/js/Controllers/App.Controllers.Toolbar.js"></script>
  <script src="/assets/js/UI/App.UI.Toolbar.js"></script>
  <script src="/assets/js/UI/App.UI.Modal.js"></script>
  <script src="/assets/js/Models/App.Models.ToolbarButton.js"></script>
  <script src="/assets/js/ViewModels/App.ViewModels.Toolbar.js"></script>
  <script src="/assets/js/ViewModels/App.ViewModels.Modal.js"></script>
  <script>
  App.Config.set({
    debug: true,
    mapApiKey: 'AIzaSyBRgqg6tv_ZNjtP1BYH7NRCxglMmkSFMgs'
  });
  new App.Controllers.Map();
  </script>
</body>
</html>