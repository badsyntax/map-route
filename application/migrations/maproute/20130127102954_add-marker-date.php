<?php defined('SYSPATH') OR die('No direct script access.');

class Migration_Maproute_20130127102954 extends Minion_Migration_Base {

	/**
	 * Run queries needed to apply this migration
	 *
	 * @param Kohana_Database $db Database connection
	 */
	public function up(Kohana_Database $db)
	{
		$db->query(NULL, 'ALTER TABLE  `markers` ADD  `date` INT NOT NULL AFTER  `description`');
		$db->query(NULL, 'ALTER TABLE  `markers` ADD  `location` VARCHAR( 255 ) NOT NULL AFTER  `longitude`');
	}

	/**
	 * Run queries needed to remove this migration
	 *
	 * @param Kohana_Database $db Database connection
	 */
	public function down(Kohana_Database $db)
	{
		$db->query(NULL, 'ALTER TABLE `markers` DROP `date`');
		$db->query(NULL, 'ALTER TABLE `markers` DROP `location`');
	}

}
