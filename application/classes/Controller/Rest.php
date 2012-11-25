<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Rest extends Controller {

	protected $user;
	
	public function before()
	{
		if (!Auth::instance()->logged_in())
		{
			throw HTTP_Exception::factory(401);
		}

		$this->user = Auth::instance()->get_user();
	}

	public function action_index()
	{
		switch($this->request->method())
		{
			case Request::GET:
				$this->action_get();
			break;
			case Request::POST:
				$this->action_create();
			break;
			case Request::PUT:
				$this->action_update();
			break;
			case Request::DELETE:
				$this->action_delete();
			break;
		}		
	}

	public function action_get() {}
	public function action_create() {}
	public function action_update() {}
	public function action_delete() {}

	protected function send_response($status = 200, $content_type = 'application/json', $body = NULL)
	{
		$this->response->status($status);
		$this->response->headers('Content-Type', $content_type);
		$this->response->body($body);
	}

} // End Controller_Rest	