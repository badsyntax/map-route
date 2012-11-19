<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {

  public $master_view = 'master/page';

	public function action_index()
	{

    $consumer = OAuth2_Consumer::factory('google');

    // Change to google profile API
    $request = Request::factory('https://www.googleapis.com/oauth2/v1/userinfo');

    $response = $consumer->execute($request);

    $me = json_decode($response->body());

    die(print_r($me));

    $this->response->body($response->body());
	}

  public function action_login()
  {
    $query = http_build_query(array(
      'response_type' => 'code',
      'client_id' => '826317412749.apps.googleusercontent.com',
      'scope' => 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      'redirect_uri' => 'http://maproute.proxima.cc/auth/callback'
    ));

    $google_login = 'https://accounts.google.com/o/oauth2/auth?' . $query;

    $content = View::factory('pages/auth/login')
      ->set('google_login', $google_login);

    $this->template->set('content', $content);
  }

  public function action_callback()
  {
    $code = $this->request->query('code');

    if ($code) {

      $consumer = OAuth2_Consumer::factory('google');

      $token = $consumer->request_token(array(
        'code' => $code
      ));

      $this->redirect('');
    }
  }

} // End Welcome
