<?php defined('SYSPATH') or die('No direct script access.');

function get_redirect_url($consumer = NULL)
{
	switch(Kohana::$environment)
	{
		case Kohana::DEVELOPMENT:
		case Kohana::STAGING:
			return 'http://staging.maproute.cc/auth/callback/'.$consumer;
		case Kohana::PRODUCTION:
			return 'http://maproute.cc/auth/callback/'.$consumer;
	}
}

return array(
	'consumer' => array(
		'google' => array(
			'grant_type'    => OAuth2::GRANT_TYPE_AUTH_CODE,
			'client_id'     => '826317412749.apps.googleusercontent.com',
			'client_secret' => 'kK2ohcZWEIMej-BI-Hm7eAjT',
			'authorize_uri' => 'https://accounts.google.com/o/oauth2/auth',
			'token_uri'     => 'https://accounts.google.com/o/oauth2/token',
			'redirect_uri'  => get_redirect_url('google'),
			'scope'         => 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
			'userinfo_uri'  => 'https://www.googleapis.com/oauth2/v1/userinfo',
		),
		'facebook' => array(
			'grant_type'    => OAuth2::GRANT_TYPE_AUTH_CODE,
			'client_id'     => '399194373501699',
			'client_secret' => '25b266fd0f3bf4af2f474b3163f0e7ab',
			'authorize_uri' => 'http://www.facebook.com/dialog/oauth',
			'token_uri'     => 'https://graph.facebook.com/oauth/access_token',
			'redirect_uri'  => get_redirect_url('facebook'),
			'scope'         => 'email,',
			'userinfo_uri'  => 'https://graph.facebook.com/me',
			'display'       => 'popup'
		),
	)
);