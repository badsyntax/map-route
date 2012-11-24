<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Rest extends Controller {

	public function action_index()
	{
		switch($this->request->method())
		{
			case Request::GET:
				$this->index();
			break;
			case Request::PUT:
				$this->create();
			break;
			case Request::POST:
				$this->update();
			break;
			case Request::DELETE:
				$this->delete();
			break;
		}		
	}

	public function index()
	{
		echo 'index';
	}

	public function create()
	{
		echo 'create';
	}

	public function update()
	{
		echo 'update';
	}

	public function delete()
	{
		echo 'delete';
	}

	private function format_json($data = array()) {
		return json_encode($data);
	}	

	private function format_html($data = array()) {
		return '<pre>' . var_export($data, true) . '</pre>';
	}	

} // End Controller_Rest	