<?php defined('SYSPATH') OR die('No direct script access.');

class Migration_Maproute_20121125173913 extends Minion_Migration_Base {

	/**
	 * Run queries needed to apply this migration
	 *
	 * @param Kohana_Database $db Database connection
	 */
	public function up(Kohana_Database $db)
	{
		$db->query(NULL, '
			CREATE TABLE IF NOT EXISTS `markers` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `user_id` int(11) unsigned NOT NULL,
		  `latitude` double NULL,
		  `longitude` double NULL,
		  `title` varchar(254) DEFAULT NULL,
		  `description` text,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8');

		$db->query(NULL, '
			CREATE TABLE IF NOT EXISTS `roles` (
		  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		  `name` varchar(32) NOT NULL,
		  `description` varchar(255) NOT NULL,
		  PRIMARY KEY (`id`),
		  UNIQUE KEY `uniq_name` (`name`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8');

		$db->query(NULL, "
			INSERT INTO `roles` (`id`, `name`, `description`) VALUES
			(1, 'login', 'Login privileges, granted after account confirmation'),
			(2, 'admin', 'Administrative user, has access to everything.')");

		$db->query(NULL, "
			CREATE TABLE IF NOT EXISTS `roles_users` (
		  `user_id` int(10) unsigned NOT NULL,
		  `role_id` int(10) unsigned NOT NULL,
		  PRIMARY KEY (`user_id`,`role_id`),
		  KEY `fk_role_id` (`role_id`)
		) ENGINE=MyISAM DEFAULT CHARSET=utf8");

		$db->query(NULL, "
			CREATE TABLE IF NOT EXISTS `users` (
		  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		  `email` varchar(254) NOT NULL,
		  `name` varchar(254) NOT NULL,
		  `username` varchar(32) DEFAULT '',
		  `password` varchar(64) DEFAULT NULL,
		  `oauth_token` text NOT NULL,
		  `logins` int(10) unsigned NOT NULL,
		  `last_login` int(10) unsigned DEFAULT NULL,
		  PRIMARY KEY (`id`),
		  UNIQUE KEY `uniq_email` (`email`),
		  UNIQUE KEY `uniq_username` (`username`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8");

		$db->query(NULL, "
			CREATE TABLE IF NOT EXISTS `user_tokens` (
		  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		  `user_id` int(11) unsigned NOT NULL,
		  `user_agent` varchar(40) NOT NULL,
		  `token` varchar(40) NOT NULL,
		  `created` int(10) unsigned NOT NULL,
		  `expires` int(10) unsigned NOT NULL,
		  PRIMARY KEY (`id`),
		  UNIQUE KEY `uniq_token` (`token`),
		  KEY `fk_user_id` (`user_id`),
		  KEY `expires` (`expires`)
		) ENGINE=MyISAM  DEFAULT CHARSET=utf8");
	}
	/**
	 * Run queries needed to remove this migration
	 *
	 * @param Kohana_Database $db Database connection
	 */
	public function down(Kohana_Database $db)
	{
		$db->query(NULL, 'DROP TABLE IF EXISTS `markers`');
		$db->query(NULL, 'DROP TABLE IF EXISTS `roles`');
		$db->query(NULL, 'DROP TABLE IF EXISTS `roles_users`');
		$db->query(NULL, 'DROP TABLE IF EXISTS `users`');
		$db->query(NULL, 'DROP TABLE IF EXISTS `user_tokens`');
	}

}
