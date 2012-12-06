<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_Home extends View_Layout
{
	public function google_login()
	{
		$google_config = Kohana::$config->load('oauth2.consumer.google');

		$query = http_build_query(array(
			'response_type' => 'code',
			'client_id' => $google_config['client_id'],
			'scope' => $google_config['scope'],
			'redirect_uri' => $google_config['redirect_uri']
		));

		return $google_config['authorize_uri'].'?'.$query;
	}
}