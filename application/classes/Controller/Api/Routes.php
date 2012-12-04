<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Routes extends Controller_REST
{
	public function action_index()
	{
		$response = new StdClass();
		$response->routes = array();

		$routes = ORM::factory('Route')
			->where('user_id', '=', $this->user->id)
			->find_all();
		
		foreach($routes as $route)
		{
			$response->routes[] = (object) $route->as_array();
		}

		$this->send_response(200, 'application/json', $response);
	}

	public function action_create()
	{
		$data = (array) json_decode($this->request->body());

		$data['user_id'] = $this->user->id;

		$marker = ORM::factory('Route');
		$marker->values($data);
		$marker->save();

		$response = new StdClass();
		$response->id = $marker->id;

		$this->send_response(201, 'application/json', $response);
	}

	public function action_update()
	{
		$data = (array) json_decode($this->request->body());

		$marker = ORM::factory('Route', $data['id']);

		if (!$marker->loaded())
		{
			throw HTTP_Exception::factory(500, 'Route not found');
		}

		if ($marker->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$marker->values(array(
			'longitude' => $data['longitude'],
			'latitude' => $data['latitude'],
			'description' => $data['description'],
			'title' => $data['title']
		));
		$marker->save();

		$this->send_response(200);
	}

	public function action_delete()
	{
		$data = (array) json_decode($this->request->body());

		$marker = ORM::factory('Route', $data['id']);

		if (!$marker->loaded())
		{
			throw HTTP_Exception::factory(500, 'Route not found');
		}

		if ($marker->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$marker->delete();

		$this->send_response(200);
	}
}
