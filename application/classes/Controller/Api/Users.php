<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api_Users extends Controller_REST
{
	public function action_index()
	{
		$response = REST_Response::factory(array(
			'users' => array()
		));

		$users = ORM::factory('User');

		$users->where('id', '=', $this->user->id);

		// Filter by user
		if ($id = $this->request->query('id'))
		{
			$users->and_where('id', '=', $id);
		}

		$users = $users->find_all();

		foreach($users as $user)
		{
			$newuser = array(
				'id' => $user->id,
				'email' => $user->email,
				'name' => $user->name,
				'username' => $user->username
			);
			$response->users[] = (object) $newuser;
		}

		$this->send_response(200, 'application/json', $response);
	}

	public function action_update()
	{
		$data = (array) json_decode($this->request->body());

		$user = ORM::factory('User', $data['id']);

		if (!$user->loaded())
		{
			throw HTTP_Exception::factory(500, 'User not found');
		}

		if ($user->id !== $this->user->id)
		{
			throw HTTP_Exception::factory(401);
		}

		$user->values(array(
			'email' => $data['email'],
			'name' => $data['name'],
		));
		$user->save();

		$this->send_response(200);
	}
}
