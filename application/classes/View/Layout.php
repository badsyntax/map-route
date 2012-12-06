<?php defined('SYSPATH') or die('No direct script access.');

class View_Layout 
{
  public $title = 'Map Route';

  public $_app_config = array();

  public function __construct()
  {
    $this->user = Auth::instance()->get_user();
  }

  public function scripts()
  {
    $scripts = Kohana::$config->load('assets.javascript');

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
    $styles = Kohana::$config->load('assets.css');
    
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
    $user_id = Auth::instance()->logged_in() ? $this->user->id : 0;

    $this->_app_config['user_id'] = $user_id;
    $this->_app_config['mapApiKey'] = Kohana::$config->load('site.map.key');
    $this->_app_config['debug'] = Kohana::$environment === Kohana::DEVELOPMENT;

    return json_encode($this->_app_config, JSON_NUMERIC_CHECK);
  }
}