<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Marker extends Controller_REST
{
	public function action_index()
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

	public function action_create()
	{
		$data = (array) json_decode($this->request->body());

		$data['user_id'] = $this->user->id;

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

		if ($marker->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$marker->values($data);
		$marker->save();

		$this->update_route_orders($data['route_id']);

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

		if ($marker->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$marker->delete();

		$this->send_response(200);
	}

	private function update_route_orders($route_id = NULL)
	{
		$markers = ORM::factory('Marker')
			->where('user_id', '=', $this->user->id)
			->and_where('route_id', '=', $route_id)
			->find_all();

		foreach($markers as $i => $marker) {
			$marker->route_order = $i;
			$marker->save();
		}
	}
}
