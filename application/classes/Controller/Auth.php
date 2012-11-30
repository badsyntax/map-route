<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {

	public function action_index()
	{
		try
		{
			$user = Auth::instance()->get_user();
			$token = (array) json_decode($user->token);

			$consumer = OAuth2_Consumer::factory('google', $token);
			$request = Request::factory(Kohana::$config->load('oauth2.consumer.google.userinfo_uri'));
			$response = $consumer->execute($request);
		}
		catch (OAuth2_Exception_InvalidToken $e)
		{
			$this->redirect('');
		}
		catch(ErrorException $e)
		{
			$this->redirect('');
		}

		$me = json_decode($response->body());

		die(print_r($me));
	}

	public function action_callback()
	{
		$code = $this->request->query('code');

		if ($code !== NULL)
		{
			// Get the auth token
			$consumer = OAuth2_Consumer::factory('google');
			$token = $consumer->request_token(array(
				'code' => $code
			));

			// Get the user profile data
			$request = Request::factory(Kohana::$config->load('oauth2.consumer.google.userinfo_uri'));
			$response = $consumer->execute($request);
			$profile = json_decode($response->body());

			$user = ORM::factory('User')->where('email', '=', $profile->email)->find();

			if (!$user->loaded())
			{
				try
				{
					$user->create_profile($profile, $token);
				}
				catch(ORM_Validation_Exception $e)
				{
					$errors = $e->errors();
					throw $e;
				}
			}

			Auth::instance()->login($user->email, $user->email, TRUE);
		}

		$this->redirect('');
	}

	public function action_signout()
	{
		Auth::instance()->logout();
		$this->redirect('');
	}

}