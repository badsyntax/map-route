<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_Home extends View_Layout
{
	public function google_login()
	{
		$config = Kohana::$config->load('oauth2.consumer.google');

		$query = http_build_query(array(
			'response_type' => 'code',
			'client_id' => $config['client_id'],
			'scope' => $config['scope'],
			'redirect_uri' => $config['redirect_uri']
		));

		return $config['authorize_uri'].'?'.$query;
	}

	public function facebook_login()
	{
		$config = Kohana::$config->load('oauth2.consumer.facebook');

		$query = http_build_query(array(
			'client_id' => $config['client_id'],
			'scope' => $config['scope'],
			'redirect_uri' => $config['redirect_uri']
		));

		return $config['authorize_uri'].'?'.$query;
	}
}