<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_Home extends View_Layout
{
	public function __construct()
	{
		parent::__construct();

		$this->navigation = Kostache::factory()->render(
			new View_Public_Partials_Navigation('home')
		);

		$this->policy_document = $this->generate_policy_document();
		$this->signature = $this->generate_signature();
	}

	public function google_login()
	{
		$config = Kohana::$config->load('oauth2.consumer.google');

		$query = http_build_query(array(
			'response_type' => 'code',
			'client_id' => $config['client_id'],
			'scope' => $config['scope'],
			'redirect_uri' => $config['redirect_uri']
		));

		return $config['authorize_uri'].'?'.$query;
		// return '/auth/callback/google';
	}

	public function facebook_login()
	{
		$config = Kohana::$config->load('oauth2.consumer.facebook');

		$query = http_build_query(array(
			'client_id' => $config['client_id'],
			'scope' => $config['scope'],
			'redirect_uri' => $config['redirect_uri'],
			'display' => $config['display']
		));

		return $config['authorize_uri'].'?'.$query;
	}

	public function s3()
	{
		return array(
			'acl' => 'public-read',
			'key' => Kohana::$config->load('site.s3.key'),
			'redirect_url' => URL::site('home/s3callback', true),
			'policy' => $this->policy_document,
			'signature' => $this->signature
		);
	}

	private function generate_policy_document()
	{
		$policy = new StdClass();

		$offset = 1 * 60 * 60; // 1 hour
		$policy->expiration = gmdate('Y-m-d\TH:i:s\Z', time() + $offset);

  	$policy->conditions = array(
  		(object) array('bucket' => 'maproute-local-photos'),
	    array("starts-with", '$key', 'uploads/'),
	    (object) array('acl' => 'public-read'),
	    (object) array('success_action_redirect' => URL::site('home/s3callback', true)),
	    array('starts-with', '$Content-Type', ''),
	    array('content-length-range', 0, 1048576)
	  );

	  $policy = json_encode($policy, JSON_UNESCAPED_SLASHES);
	  $policy = base64_encode($policy);

	  return $policy;
	}

	private function generate_signature()
	{
		return base64_encode(hash_hmac(
			'sha1',
			$this->policy_document,
			Kohana::$config->load('site.s3.secret'),
			true
		));
	}
}