<?php defined('SYSPATH') or die('No direct script access.');

class Model_Asset extends ORM {

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'user',
			'foreign_key' => 'user_id'
		),
	);

	public function rules()
	{
		return array(
			'filename' => array(
				array('not_empty'),
				array('max_length', array(':value', array(128))),
				array(array($this, 'filename_empty'))
			),
			'description' => array(
				array('not_empty'),
				array('max_length', array(':value', array(255))),
			)
		);
	}

	public function save_uploaded($data = array())
	{
		$file_path   = $data['file_path'];
		$file_name   = basename($file_path);
		$extension   = Asset::extension($file_name);
		$description = Asset::description($file_name);

		$mimetype = ORM::factory('mimetype')
			->where('extension', '=', $extension)
			->find();

		$data = array(
			'user_id'           => Auth::instance()->get_user()->id,
			'mimetype_id'       => $mimetype->id,
			'folder_id'         => $data['folder_id'],
			'filename'          => $file_name,
			'friendly_filename' => $file_name,
			'description'       => $description,
			'filesize'          => filesize($file_path)
		);

		$this->values($data);
		$this->save();

		// Create a new filename with id prefixed
		$new_filename   = str_replace($this->filename, $this->id.'_'.$this->filename, $file_path);
		$this->filename = basename($new_filename);
		$this->save();

		// Move the file to the new filename path
		rename($file_path, $new_filename);
	}

	public function admin_update($data)
	{
		$this->values($data);

		return $this->save();
	}

	public function admin_delete()
	{
		// Try delete the asset from the filesystem.
		try
		{
			unlink(DOCROOT.Kohana::$config->load('assets.upload_path').'/'.$this->filename);
		}
		catch(Exception $e)
		{
			Log::instance()->add(Log::ERROR, $e->getMessage());
		}

		foreach($this->sizes->find_all() as $resized)
		{
			// Try delete the resized asset from the filesystem.
			try
			{
				unlink(DOCROOT.Kohana::$config->load('assets.upload_path').'/resized/'.$resized->filename);
			}
			catch(Exception $e)
			{
				Log::instance()->add(Log::ERROR, $e->getMessage());
				throw $e;
			}

			$resized->delete();
		}

		return parent::delete();
	}
} // End Model_Asset