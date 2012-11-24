<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Marker extends Controller_Rest {

	public function action_create()
	{
		$data = (array) json_decode($this->request->body());

		$marker = ORM::factory('Marker');
		$marker->values($data);
		$marker->save();

		$response = new StdClass();
		$response->id = $marker->id;

		$this->response->headers('Content-Type', 'application/json');
		$this->response->status(201);
		$this->response->body(json_encode($response));
	}

	public function action_get()
	{
		$response = new StdClass();
		$response->markers = array();

		$markers = ORM::factory('Marker')->find_all();
		
		foreach($markers as $marker)
		{
			$response->markers[] = (object) $marker->as_array();
		}

		$this->response->headers('Content-Type', 'application/json');
		$this->response->status(200);
		$this->response->body(json_encode($response));
	}
}