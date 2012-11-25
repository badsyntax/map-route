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

		$this->send_response(201, 'application/json', json_encode($response));
	}

	public function action_update()
	{
		$data = (array) json_decode($this->request->body());

		$marker = ORM::factory('Marker', $data['id']);

		if (!$marker->loaded())
		{
			throw HTTP_Exception::factory(500, 'Marker not found');
		}

		$marker->values(array(
			'longitude' => $data['longitude'],
			'latitude' => $data['latitude']
		));
		$marker->save();

		$this->send_response(200);
	}

	public function action_delete()
	{
		$data = (array) json_decode($this->request->body());

		$marker = ORM::factory('Marker', $data['id']);

		if (!$marker->loaded())
		{
			throw HTTP_Exception::factory(500, 'Marker not found');
		}

		$marker->delete();

		$this->send_response(200);
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

		$this->send_response(200, 'application/json', json_encode($response));
	}
}