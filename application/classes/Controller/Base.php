<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base extends Controller {

	public $template = NULL;
	public $front_end_config = array();
	protected $_auth_required = FALSE;

	public function before()
	{
		// The user may be logged in but not have the correct permissions to view this controller and/or action,
		// so instead of redirecting to signin page we redirect to 403 Forbidden
		if ( Auth::instance()->logged_in() AND Auth::instance()->logged_in($this->_auth_required) === FALSE)
		{
			$this->request->redirect('403');
		}

		// If this page is secured and the user is not logged in (or doesn't match role), then redirect to the signin page
		if ($this->_auth_required !== FALSE && Auth::instance()->logged_in($this->_auth_required) === FALSE)
		{
			Message::set(Message::ERROR, __('You need to be signed in to do that.'));

			// Generate the signin URL
			$uri = Route::get('admin')
				->uri(array(
					'controller' => 'auth',
					'action' => 'signin'
				));

			// Set the return path so user is redirect back to this page after successful sign in.
			$uri .= '?return_to=' . $this->request->uri();

			$this->request->redirect($uri);
		}

		// Create the global template
		$this->template = View::factory($this->master_view);
	}

	public function after()
	{
		// If it's an AJAX or HMVC internal request then only render the INNER template
		if ($this->request->is_ajax() OR Request::initial() !== $this->request)
		{
			$this->response->body($this->template->content);
		}
		// Else render the master template
		else
		{
			$this->set_front_end_config();

			// Render the master template
			$this->response->body($this->template);
		}
	}

	private function set_front_end_config()
	{
		if (Auth::instance()->logged_in())
		{
			$user_id = Auth::instance()->get_user()->id;
		}
		else
		{
			$user_id = 0;
		}

		$this->front_end_config['user_id'] = $user_id;
		$this->front_end_config['mapApiKey'] = Kohana::$config->load('site.map.key');
		$this->front_end_config['debug'] = Kohana::$environment === Kohana::DEVELOPMENT;

		$this->template->front_end_config = json_encode($this->front_end_config);
	}

} // End Controller_Base