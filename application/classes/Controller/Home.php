<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller_Base {

	public $master_view = 'master/page';

	public function action_index()
	{
		$google_config = Kohana::$config->load('oauth2.consumer.google');

		$query = http_build_query(array(
			'response_type' => 'code',
			'client_id' => $google_config['client_id'],
			'scope' => $google_config['scope'],
			'redirect_uri' => $google_config['redirect_uri']
		));

		$google_login = $google_config['authorize_uri'].'?'.$query;

		$content = View::factory('pages/home')
			->set('google_login', $google_login);

		$this->template->content = $content;
	}

} // End Welcome
