<VirtualHost 78.46.128.168:80>
	
	DocumentRoot	/home/richard/www/sites/staging.maproute.cc/httpdocs
	ServerName	staging.maproute.cc

 	UseCanonicalName On

  CustomLog /home/richard/www/logs/staging.maproute.cc-alogs combined
  ErrorLog /home/richard/www/logs/staging.maproute.cc-elogs

  # Set the environment
  SetEnv KOHANA_ENV development

  # Secure the dev area
  <DirectoryMatch /home/richard/www/sites/staging.maproute.cc/httpdocs>
      AuthType Basic
      AuthName "Restricted Area"
      AuthUserFile /etc/apache2/users
      Require valid-user
  </DirectoryMatch>

</VirtualHost>
