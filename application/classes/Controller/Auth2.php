<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {

	protected $layout = 'layoutsimple';

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
			switch($this->request->param('id'))
			{
				case 'google':
					$this->login_google($code);
					break;
				case 'facebook':
					$this->login_facebook($code);
					break;
			}
		}
		$this->content = new View_Auth_Callback;
	}

	private function save_user($profile)
	{
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

		return $user;
	}

	private function login_facebook($code = NULL)
	{
		$consumer = OAuth2_Consumer::factory('facebook');
		$token = $consumer->request_token(array(
			'code' => $code
		));

		// $consumer = OAuth2_Consumer::factory();
		// $token = $consumer->get_token(); 

		// $config = Kohana::$config->load('oauth2.facebook');

		// $url = 'https://graph.facebook.com/oauth/access_token';

		// $request = Request::factory($config['token_uri'])
		// 		->method(Request::POST)
		// 		->headers(new HTTP_Header(array(
		// 			'accept' => 'application/json'
		// 		)))
		// 		->post(array(
		// 			'code'          => $code,
		// 			'client_id'     => $config['client_id'],
		// 			'client_secret' => $config['client_secret'],
		// 			'redirect_uri'  => $config['redirect_uri'],
		// 			'grant_type'    => 'authorization_code'
		// 		));
				
		// $response = $request->execute();

		// $params = null;
		// parse_str($response->body(), $params);

		// Get the user profile data
		$url = Kohana::$config->load('oauth2.consumer.facebook.userinfo_uri');
		$url .= '?access_token='.$token['access_token'];
		$request = Request::factory($url);
		$response = $request->execute();
		$profile = json_decode($response->body());

		$user = $this->save_user($profile);
		Auth::instance()->login($user->email, $user->email, TRUE);
	}

	private function login_google($code = NULL)
	{

				$consumer = OAuth2_Consumer::factory('googleZ');
		$token = $consumer->request_token(array(
			'code' => $code
		));


		// $url = 'https://accounts.google.com/o/oauth2/token';

		// $request = Request::factory($url)
		// 		->method(Request::POST)
		// 		->post(array(
		// 			'code' => $code,
		// 			'client_id' => '826317412749.apps.googleusercontent.com',
		// 			'client_secret' => 'kK2ohcZWEIMej-BI-Hm7eAjT',
		// 			'redirect_uri' => 'http://staging.maproute.cc/auth/callback/google',
		// 			'grant_type' => 'authorization_code'
		// 		));
		// $request->headers(new HTTP_Header(array('accept' => 'application/json')));
				
		// $response = $request->execute();

		// echo $response->body();

		exit;

		// Get the auth token
		$consumer = OAuth2_Consumer::factory('google');
		$token = $consumer->request_token(array(
			'code' => $code
		));

		// Get the user profile data
		$request = Request::factory(Kohana::$config->load('oauth2.consumer.google.userinfo_uri'));
		$response = $consumer->execute($request);
		$profile = json_decode($response->body());

		$user = $this->save_user($profile);
		Auth::instance()->login($user->email, $user->email, TRUE);
	}

	public function action_signout()
	{
		Auth::instance()->logout();
		$this->redirect('');
	}

}