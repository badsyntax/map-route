<?php defined('SYSPATH') or die('No direct script access.');

class View_Layout
{
	public $title = 'Map Route';
	protected $environment = NULL;

	public function __construct()
	{
		$this->user = Auth::instance()->get_user();
		$this->logged_in = ($this->user AND $this->user->loaded());
		$this->device = new Device();
		$this->environment = Kohana::$environment === Kohana::PRODUCTION ? 'production' : 'development';
	}

	public function bodyclass()
	{
		return 'home' . (($this->logged_in) ? ' edit' : ' signin');
	}

	public function is_mobile()
	{
		return $this->device->is_mobile();
	}

	public function scripts()
	{
		$group = $this->logged_in ? 'edit' : 'signin';
		$script_config = 'assets.'.$this->environment.'.'.$group.'.javascript';
		$scripts = Kohana::$config->load($script_config);

		if (Kohana::$environment === Kohana::PRODUCTION)
		{
			return HTML::script(Compress::instance('javascripts')->scripts($scripts));
		}
		else
		{
			return implode("\n", array_map('HTML::script', $scripts));
		}
	}

	public function stylesheets()
	{
		$group = $this->logged_in ? 'edit' : 'signin';
		$style_config = 'assets.'.$this->environment.'.'.$group.'.css';
		$styles = Kohana::$config->load($style_config);

		if (Kohana::$environment === Kohana::PRODUCTION)
		{
			return HTML::style(Compress::instance('stylesheets')->styles($styles));
		}
		else
		{
			return implode("\n", array_map('HTML::style', $styles));
		}
	}

	public function app_config()
	{
		$config = array(
			'mapApiKey' => Kohana::$config->load('site.map.key'),
			'debug' => Kohana::$environment === Kohana::DEVELOPMENT,
			'hosts' => array(
				'photos' => Kohana::$config->load('site.photos.s3bucket')[Kohana::$environment]
			)
		);

		$config['user_id'] = 0;

		if ($this->user !== NULL && $this->user->loaded())
		{
			$config['user_id'] = $this->user->id;

			$route = $this->user->routes
				->order_by('id', 'ASC')
				->limit(1)
				->find();

			if ($route->loaded())
			{
				$config['default_route'] = $route->id;
			}
		}

		return json_encode($config, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
	}

	public function coming_soon()
	{
		return (Kohana::$environment === Kohana::PRODUCTION AND Kohana::$config->load('site.comingsoon'));
	}

	public function username()
	{
		return ($this->user === NULL OR !$this->user->loaded()) ? '' : ($this->user->name ?: $this->user->username ?: $this->user->email);
	}
}