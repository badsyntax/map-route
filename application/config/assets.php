<?php defined('SYSPATH') or die('No direct script access.');

$js = array(
	'assets/lib/jquery/jquery-1.9.1.min.js',
	'assets/lib/jquery/jquery-file-upload/js/vendor/jquery.ui.widget.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/tmpl.min.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/load-image.min.js', // FILEUPLOAD
	'assets/lib/jquery/jquery-file-upload/js/canvas-to-blob.min.js', // FILEUPLOAD
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
	'assets/js/App.js',
	'assets/js/Util/App.Util.js',
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
	'assets/js/UI/Modal/App.UI.Modal.EditMarker.js',
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
				'assets/css/screen.css',
		  ),
	  	'javascript' => $js,
		 )
	),
);
