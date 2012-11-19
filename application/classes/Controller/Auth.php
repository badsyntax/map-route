<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {

  public $master_view = 'master/page';

	public function action_index()
	{
    $consumer = OAuth2_Consumer::factory('google');
    $request = Request::factory(Kohana::$config->load('oauth2.consumer.google.userinfo_uri'));
    $response = $consumer->execute($request);

    $me = json_decode($response->body());

    die(print_r($me));

    $this->response->body($response->body());
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

      $token = $consumer->request_token(array(
        'code' => $code
      ));
    }

    $this->template->set('content', 'handle redirect with js');
  }

} // End Welcome
