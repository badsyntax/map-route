<?php

class Model_User extends Model_Auth_User {

	protected $_has_many = array(
		'user_tokens' => array('model' => 'User_Token'),
		'roles'       => array('model' => 'Role', 'through' => 'roles_users'),
		'routes'      => array('model' => 'Route'),
	);

	public function create_profile($profile = NULL, $token = NULL)
	{
		// Prep the model data
		$data = array(
			'email' => $profile->email,
			'username' => $profile->email,
			'password' => $profile->email,
			'name' => $profile->name,
			'oauth_token' => json_encode($token)
		);

		// Create the user
		$this->values($data)->save();
		$role = new Model_Role(array('name' =>'login'));
		$this->add('roles', $role);	
	}
	
}