<?php defined('SYSPATH') or die('No direct script access.');

$js = array(
	'assets/lib/jquery/jquery-1.9.1.min.js',
	'assets/lib/jquery-ui/js/jquery-ui-1.10.2.custom.js',
	'assets/lib/jquery/jquery-file-upload/js/vendor/jquery.ui.widget.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/tmpl.min.js',                // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/load-image.min.js',         // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/canvas-to-blob.min.js',     // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/jquery.iframe-transport.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/jquery.fileupload.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/jquery.fileupload-fp.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/jquery.fileupload-ui.js', // FILEUPLOAD
	'assets/lib/jquery/path.min.js',
	'assets/lib/jquery/globalize.js',
	'assets/lib/jquery/jquery.tinyscrollbar.js',
	'assets/lib/jquery/cultures/globalize.culture.en-GB.js',
	'assets/lib/bootstrap/js/bootstrap.min.js',
	'assets/lib/knockout/knockout-2.2.1.js',
	'assets/lib/knockout/knockout.mapping-2.3.4.js',
	'assets/js/CustomBindings.js',
	'assets/js/MapRoute.js',
	'assets/js/Util/MapRoute.Util.js',
	'assets/js/Router/MapRoute.Router.js',
	'assets/js/Events/MapRoute.Events.js',
	'assets/js/Config/MapRoute.Config.js',
	'assets/js/API/MapRoute.API.Base.js',
	'assets/js/API/MapRoute.API.Marker.js',
	'assets/js/API/MapRoute.API.Photo.js',
	'assets/js/API/MapRoute.API.Route.js',
	'assets/js/API/MapRoute.API.User.js',
	'assets/js/Map/MapRoute.Map.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.Action.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.Markers.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.Route.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.Share.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.View.js',
	'assets/js/Map/Actions/MapRoute.Map.Actions.ZoomOut.js',
	'assets/js/Controllers/MapRoute.Controllers.Map.js',
	'assets/js/Controllers/MapRoute.Controllers.SignIn.js',
	'assets/js/UI/MapRoute.UI.Device.js',
	'assets/js/UI/MapRoute.UI.Modal.js',
	'assets/js/UI/Modal/MapRoute.UI.Modal.EditMarker.js',
	'assets/js/UI/MapRoute.UI.PlacesSearch.js',
	'assets/js/UI/Sidebar/MapRoute.UI.Sidebar.js',
	'assets/js/UI/Sidebar/MapRoute.UI.Sidebar.Search.js',
	'assets/js/Models/MapRoute.Models.Base.js',
	'assets/js/Models/MapRoute.Models.Route.js',
	'assets/js/Models/MapRoute.Models.Photo.js',
	'assets/js/Models/MapRoute.Models.ToolbarButton.js',
	'assets/js/Models/MapRoute.Models.Marker.js',
	'assets/js/Models/MapRoute.Models.User.js',
	'assets/js/ViewModels/MapRoute.ViewModels.Base.js',
	'assets/js/ViewModels/Navbar/MapRoute.ViewModels.Navbar.js',
	'assets/js/ViewModels/Navbar/MapRoute.ViewModels.Navbar.Toolbar.js',
	'assets/js/ViewModels/Navbar/MapRoute.ViewModels.Navbar.DropMenu.js',
	'assets/js/ViewModels/Navbar/MapRoute.ViewModels.Navbar.DropMenu.User.js',
	'assets/js/ViewModels/Navbar/MapRoute.ViewModels.Navbar.DropMenu.Routes.js',
	'assets/js/ViewModels/MapRoute.ViewModels.Modal.js',
	'assets/js/ViewModels/MapRoute.ViewModels.Modal.Profile.js',
	'assets/js/ViewModels/MapRoute.ViewModels.Modal.EditMarker.js',
	'assets/js/ViewModels/MapRoute.ViewModels.Sidebar.js',
	'assets/js/Map/MapRoute.Map.Marker.js',
	'assets/js/Map/MapRoute.Map.Route.js',
	'assets/js/Map/MapRoute.Map.InfoWindow.js'
);

if (Kohana::$environment === Kohana::PRODUCTION)
{
	array_unshift($js, 'assets/js/Production/header.js');
	array_push($js, 'assets/js/Production/footer.js');
}

$signin_production = Kohana::$config->load('site.comingsoon') ? array(
	'css' => array(
	 'assets/lib/bootstrap/css/bootstrap.min.css',
		'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
		'assets/lib/fontawesome/css/font-awesome.css',
		'assets/css/comingsoon.css'
  ),
  'javascript' =>  array(
		'assets/js/ComingSoon.js',
 	),
) : array(
	'css' => array(
		'assets/lib/bootstrap/css/bootstrap.min.css',
		'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
		'assets/lib/fontawesome/css/font-awesome.css',
		'assets/css/signin.css',
	),
	'javascript' => $js,
);

return array(
	'production' => array(
		'signin' => $signin_production,
		'edit' => array(
			'css' => array(
				'assets/lib/bootstrap/css/bootstrap.min.css',
				'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
				'assets/lib/fontawesome/css/font-awesome.css',
				// 'assets/lib/jquery-ui/css/jquery-ui-1.10.2.custom.css',
				'assets/css/screen.css',
		  ),
	  	'javascript' => $js,
		 )
	),
	'development' => array(
		'signin' => array(
		  'css' => array(
				'assets/lib/bootstrap/css/bootstrap.min.css',
				'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
				'assets/lib/fontawesome/css/font-awesome.css',
				'assets/css/signin.css',
		  ),
		  'javascript' => $js,
		),
		'edit' => array(
			'css' => array(
				'assets/lib/bootstrap/css/bootstrap.min.css',
				'assets/lib/bootstrap/css/bootstrap-responsive.min.css',
				'assets/lib/fontawesome/css/font-awesome.css',
				'assets/lib/jquery/jquery-file-upload/css/jquery.fileupload-ui.css',
				// 'assets/lib/jquery-ui/css/jquery-ui-1.10.2.custom.css',
				'assets/css/screen.css',
		  ),
	  	'javascript' => $js,
		 )
	),
);
