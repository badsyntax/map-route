<?php defined('SYSPATH') or die('No direct script access.');

return array(
	'comingsoon' => FALSE,
	'modules' => array(
		'compress'   => MODPATH.'compress',
		'auth'       => MODPATH.'auth',
		'minion'     => MODPATH.'minion',
		'cache'      => MODPATH.'cache',
		'image'      => MODPATH.'image',
		'database'   => MODPATH.'database',
		'orm'        => MODPATH.'orm',
		'oauth2'     => MODPATH.'oauth2',
		'kostache'   => MODPATH.'kostache',
		'device'     => MODPATH.'device',
		'userguide'  => MODPATH.'userguide',
		'minion-tasks-migrations' => MODPATH.'minion-tasks-migrations',
	),
	'cookie' => array(
		'salt' => 'JpTKsYl8dfdf3sNbHKqg',
	),
	'map' => array(
		'key' => 'AIzaSyBRgqg6tv_ZNjtP1BYH7NRCxglMmkSFMgs',
	),
	's3' => array(
		'key' => 'AKIAIVYJAENDGX5BFRYQ',
		'secret' => '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',
		'region' => 'eu-west-1'
	),
	'photos' => array(
		'sizes' => array(
			'thumb'  => array(200, 200),
			'screen' => array(1000, 1000)
		),
		's3bucket' => array(
			Kohana::DEVELOPMENT => 'local.photos.staging.maproute.cc',
			Kohana::STAGING     => 'photos.staging.maproute.cc',
			Kohana::PRODUCTION  => 'photos.maproute.cc'
		),
	)
);