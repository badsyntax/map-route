<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Rest extends Controller {

	public function action_index()
	{
		switch($this->request->method())
		{
			case Request::GET:
				$this->action_get();
			break;
			case Request::PUT:
				$this->action_create();
			break;
			case Request::POST:
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

} // End Controller_Rest	