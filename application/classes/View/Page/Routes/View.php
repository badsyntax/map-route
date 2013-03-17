<?php defined('SYSPATH') or die('No direct script access.');

class View_Page_Routes_View extends View_Layout
{
  public function __construct($id = NULL)
  {
    parent::__construct();

    $this->navigation = Kostache::factory()->render(
      new View_Public_Partials_Navigation('routes')
    );

    $this->route = ORM::factory('Route', $id);

    if (!$this->route->loaded())
    {
      throw new Exception('Route not found');
    }

    $this->markers = [];

    foreach($this->route->markers->find_all() as $marker)
    {
      $photos = [];
      foreach($marker->photos->find_all() as $photo)
      {
        $photos[] = $photo;
      }
      $marker = $marker->as_array();
      $marker['photos'] = $photos;
      $this->markers[] = $marker;
    }
  }

  public function urls()
  {
    return array(
      'overview' => URL::site(Route::get('routes')->uri(array(
        'id' => $this->route->id,
        'action' => 'view'
      ))),
      'map' => URL::site(Route::get('default')->uri(array())),
      'gallery' => URL::site(Route::get('routes')->uri(array(
        'action' => 'view',
        'id' => $this->route->id,
        'section' => 'gallery'
      ))),
      'share' => URL::site(Route::get('routes')->uri(array()))
    );
  }
}