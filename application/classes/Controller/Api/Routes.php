<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Routes extends Controller_REST
{
	public function action_index()
	{
		$response = REST_Response::factory(array(
			'routes' => array()
		));

		$routes = ORM::factory('Route');

		if ($edit = $this->request->query('edit'))
		{
			$routes->where('user_id', '=', $this->user->id);
		}

		if ($id = $this->request->query('id'))
		{
			$routes->where('id', '=', $id);
		}

		$routes = $routes->find_all();

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

		$route = ORM::factory('Route');
		$route->values($data);
		$route->save();

		$response = new StdClass();
		$response->id = $route->id;

		$this->send_response(201, 'application/json', REST_Response::factory(array(
			'id' => $route->id
		)));
	}

	public function action_update()
	{
		$data = (array) json_decode($this->request->body());

		$route = ORM::factory('Route', $data['id']);

		if (!$route->loaded())
		{
			throw HTTP_Exception::factory(500, 'Route not found');
		}

		if ($route->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$route->values($data);

		try
		{
			$route->save();
		}
		catch(ORM_Validation_Exception $e)
		{
			$errors = $e->errors('route');
			return $this->send_response(500, 'application/json', REST_Response::factory(array('errors' => $errors)));
		}

		$this->send_response(200, 'application/json', REST_Response::factory($route));
	}

	public function action_delete()
	{
		$data = (array) json_decode($this->request->body());

		$route = ORM::factory('Route', $data['id']);

		if (!$route->loaded())
		{
			throw HTTP_Exception::factory(500, 'Route not found');
		}

		if ($route->user_id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$route->delete();

		$this->send_response(200);
	}
}
