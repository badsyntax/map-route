<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Photos extends Controller_REST
{
	public function action_index()
	{
		$response = REST_Response::factory(array(
			'photos' => array()
		));

		$this->send_response(200, 'application/json', $response);
	}

	public function action_create()
	{
		$this->send_response(201, 'application/json', REST_Response::factory(array(
			'id' => 0
		)));
	}
}
