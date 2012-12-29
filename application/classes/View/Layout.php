<?php defined('SYSPATH') or die('No direct script access.');

class View_Layout 
{
	public $title = 'Map Route';
	public $_app_config = array();
	protected $environment = NULL;

	public function __construct()
	{
		$this->user = Auth::instance()->get_user();
		$this->device = new Device();
		$this->environment = Kohana::$environment === Kohana::PRODUCTION ? 'production' : 'development';
	}

	public function is_mobile()
	{
		return $this->device->is_mobile();
	}

	public function scripts()
	{
		$script_config = 'assets.'.$this->environment.'.javascript';
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
		$style_config = 'assets.'.$this->environment.'.css';
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
		$this->_app_config['mapApiKey'] = Kohana::$config->load('site.map.key');
		$this->_app_config['debug'] = Kohana::$environment === Kohana::DEVELOPMENT;

		if ($this->user !== NULL && $this->user->loaded()) 
		{
			$this->_app_config['user_id'] = $this->user->id;
			
			$route = $this->user->routes
				->order_by('id', 'ASC')
				->limit(1)
				->find();

			if ($route->loaded())
			{
				$this->_app_config['default_route'] = $route->id;
			}
		}
		else
		{
			$this->_app_config['user_id'] = 0;
		}

		return json_encode($this->_app_config, JSON_NUMERIC_CHECK);
	}

	public function coming_soon()
	{
		return Kohana::$environment === Kohana::PRODUCTION;		
	}
}