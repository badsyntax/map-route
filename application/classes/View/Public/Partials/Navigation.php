<?php defined('SYSPATH') or die('No direct script access.');

class View_Public_Partials_Navigation
{
  public $selected;

  public function __construct($selected = NULL)
  {
    $this->selected = $selected;
  }

  public function pages()
  {
    return array(
      array(
        'title' => 'Sign in',
        'url' =>  '/',
        'selected' => ($this->selected === 'home')
      ),
      array(
        'title' => 'About',
        'url' => '/about',
        'selected' => ($this->selected === 'about')
      ),
      array(
        'title' => 'Routes',
        'url' => '/routes',
        'selected' => ($this->selected === 'routes')
      ),
      array(
        'title' => 'Contact',
        'url' => '/contact',
        'selected' => ($this->selected === 'contact')
      )
    );
  }

}