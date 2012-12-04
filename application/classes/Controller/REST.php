<?php defined('SYSPATH') or die('No direct script access.');

class Controller_REST extends Kohana_Controller_REST {

	public function before()
	{
		if (!Auth::instance()->logged_in())
		{
			throw HTTP_Exception::factory(401);
		}

		$this->user = Auth::instance()->get_user();

		parent::before();
	}

	protected function send_response($status = 200, $content_type = 'application/json', $body = NULL)
	{
		$this->response->status($status);
		$this->response->headers('Content-Type', $content_type);
		$this->response->body($body);
	}
}