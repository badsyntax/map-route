<?php defined('SYSPATH') or die('No direct script access.');

return array(
	'consumer' => array(
    'google' => array(
      'grant_type'    => OAuth2::GRANT_TYPE_AUTH_CODE,
      'client_id'     => '826317412749.apps.googleusercontent.com',
      'client_secret' => 'kK2ohcZWEIMej-BI-Hm7eAjT',
      'authorize_uri' => 'https://accounts.google.com/o/oauth2/auth',
      'token_uri'     => 'https://accounts.google.com/o/oauth2/token',
      'redirect_uri'  => 'http://maproute.proxima.cc/auth/callback',
      'scope'         => 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      'userinfo_uri'  => 'https://www.googleapis.com/oauth2/v1/userinfo',
    ),
	)
);