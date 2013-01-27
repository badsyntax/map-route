<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Markers extends Controller_REST
{
	public function action_index()
	{
		$response = REST_Response::factory(array(
			'markers' => array()
		));

		$markers = ORM::factory('Marker');

		// TODO: check if this route can be shared
		// $markers->where('user_id', '=', $this->user->id);

		// Filter by route
		if ($route_id = $this->request->query('route_id'))
		{
			$markers->and_where('route_id', '=', $route_id);
		}
		else
		{
			throw HTTP_Exception::factory(500, 'No route specified');
		}
		$markers->order_by('route_order', 'ASC');
		$markers = $markers->find_all();

		foreach($markers as $marker)
		{
			$response->markers[] = (object) $marker->as_array();
		}

		$this->send_response(200, 'application/json', $response);
	}

	public function action_create()
	{
		$data = array_merge(
			(array) json_decode($this->request->body()),
			array('user_id' => $this->user->id)
		);

		$marker = ORM::factory('Marker');
		$marker->values($data);
		$marker->save();

		$this->send_response(201, 'application/json', REST_Response::factory($marker->as_array()));
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

		$data = array_merge(
			$data,
			array('user_id' => $this->user->id)
		);

		$marker->values($data);
		$marker->save();

		$this->update_route_orders($data['route_id']);

		$this->send_response(200, 'application/json', REST_Response::factory($marker));
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
			->and_where('route_order', '>=', 0)
			->and_where('route_id', '=', $route_id)
			->order_by('route_order', 'ASC')
			->find_all();

		foreach($markers as $i => $marker)
		{
			$marker->route_order = $i;
			$marker->save();
		}
	}
}
