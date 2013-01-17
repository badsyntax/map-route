<?php defined('SYSPATH') or die('No direct script access.');

$js = array(
	'assets/lib/jquery/jquery-1.9.0b1.min.js',
	'assets/lib/jquery/path.min.js',
	'assets/lib/jquery/jquery.tinyscrollbar.js',
	'assets/lib/bootstrap/js/bootstrap.min.js',
	'assets/lib/knockout/knockout-2.2.0.debug.js',
	'assets/lib/knockout/knockout.mapping-2.3.4.js',
	'assets/js/CustomBindings.js',
	'assets/js/App.js',
	'assets/js/Router/App.Router.js',
	'assets/js/Events/App.Events.js',
	'assets/js/Config/App.Config.js',
	'assets/js/API/App.API.Base.js',
	'assets/js/API/App.API.Marker.js',
	'assets/js/API/App.API.Route.js',
	'assets/js/API/App.API.User.js',
	'assets/js/Map/App.Map.js',
	'assets/js/Map/Actions/App.Map.Actions.js',
	'assets/js/Map/Actions/App.Map.Actions.Action.js',
	'assets/js/Map/Actions/App.Map.Actions.Markers.js',
	'assets/js/Map/Actions/App.Map.Actions.Routes.js',
	'assets/js/Map/Actions/App.Map.Actions.Profile.js',
	'assets/js/Map/Actions/App.Map.Actions.Share.js',
	'assets/js/Map/Actions/App.Map.Actions.View.js',
	'assets/js/Map/Actions/App.Map.Actions.ZoomOut.js',
	'assets/js/Controllers/App.Controllers.Map.js',
	'assets/js/Controllers/App.Controllers.SignIn.js',
	'assets/js/UI/App.UI.Device.js',
	'assets/js/UI/App.UI.Modal.js',
	'assets/js/UI/App.UI.PlacesSearch.js',
	'assets/js/UI/Sidebar/App.UI.Sidebar.js',
	'assets/js/UI/Sidebar/App.UI.Sidebar.Search.js',
	'assets/js/Models/App.Models.Base.js',
	'assets/js/Models/App.Models.Route.js',
	'assets/js/Models/App.Models.ToolbarButton.js',
	'assets/js/Models/App.Models.Marker.js',
	'assets/js/Models/App.Models.User.js',
	'assets/js/ViewModels/Navbar/App.ViewModels.Navbar.js',
	'assets/js/ViewModels/Navbar/App.ViewModels.Navbar.Toolbar.js',
	'assets/js/ViewModels/Navbar/App.ViewModels.Navbar.DropMenu.js',
	'assets/js/ViewModels/App.ViewModels.Modal.js',
	'assets/js/ViewModels/App.ViewModels.Modal.Profile.js',
	'assets/js/ViewModels/App.ViewModels.Sidebar.js',
	'assets/js/Map/App.Map.Marker.js',
	'assets/js/Map/App.Map.Route.js',
	'assets/js/Map/App.Map.InfoWindow.js'
);

return array(
	'production' => array(
		'css' => array(
			'assets/lib/bootstrap/css/bootstrap.min.css',
			'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
			'assets/lib/fontawesome/css/font-awesome.css',
			'assets/css/comingsoon.css',
		),
		'javascript' => array(
			'assets/js/ComingSoon.js',
		)
	),
	'development' => array(
		'signin' => array(
		  'css' => array(
		  	'http://fonts.googleapis.com/css?family=Orbitron:700',
				'assets/lib/bootstrap/css/bootstrap.min.css',
				'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
				'assets/lib/fontawesome/css/font-awesome.css',
				'assets/css/signin.css',
		  ),
		  'javascript' => $js,
		),
		'edit' => array(
			'css' => array(
		  	'http://fonts.googleapis.com/css?family=Orbitron:700',
				'assets/lib/bootstrap/css/bootstrap.min.css',
				'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
				'assets/lib/fontawesome/css/font-awesome.css',
				'assets/css/screen.css',
		  ),
	  	'javascript' => $js,
		 )
	),
);
