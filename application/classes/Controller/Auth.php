<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {

  public $master_view = 'master/page';

	public function action_index()
	{
    if (Auth::instance()->logged_in())
    {
      echo 'user is logged in';
    }
    else
    {
      echo 'User is not logged in';
    }

    $consumer = OAuth2_Consumer::factory('google');
    $request = Request::factory(Kohana::$config->load('oauth2.consumer.google.userinfo_uri'));
    $response = $consumer->execute($request);

    $me = json_decode($response->body());

    die(print_r($me));
	}

  public function action_login()
  {
    $google_config = Kohana::$config->load('oauth2.consumer.google');

    $query = http_build_query(array(
      'response_type' => 'code',
      'client_id' => $google_config['client_id'],
      'scope' => $google_config['scope'],
      'redirect_uri' => $google_config['redirect_uri']
    ));

    $google_login = $google_config['authorize_uri'].'?'.$query;

    $content = View::factory('pages/auth/login')
      ->set('google_login', $google_login);

    $this->template->set('content', $content);
  }

  public function action_callback()
  {
    $code = $this->request->query('code');

    if ($code !== NULL)
    {
      $consumer = OAuth2_Consumer::factory('google');

      // Token is stored in Session
      $token = $consumer->request_token(array(
        'code' => $code
      ));

      // Get the user profile data
      $consumer = OAuth2_Consumer::factory('google');
      $request = Request::factory(Kohana::$config->load('oauth2.consumer.google.userinfo_uri'));
      $response = $consumer->execute($request);
      $profile = json_decode($response->body());

      // Find the user in the DB
      $user = ORM::factory('User')->where('email', '=', $profile->email)->find();

      if (!$user->loaded())
      {
        try
        {
          $data = array(
              'email' => $profile->email,
              'username' => $profile->email,
              'password' => $profile->email,
              'name' => $profile->name
          );
          // Create the user
          $user->values($data)->save();
          $user->add('roles', new Model_Role(array('name' =>'login')));
        }
        catch(ORM_Validation_Exception $e)
        {
          $errors = $e->errors();
          die(print_r($errors));
        }
      }

      Auth::instance()->login($user->email, $profile->email, TRUE);
    }

    $this->redirect('');
  }

}