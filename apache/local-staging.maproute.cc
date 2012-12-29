<VirtualHost *:80>
	
	DocumentRoot	/home/richard/Projects/staging.maproute.cc/httpdocs
	ServerName	staging.maproute.cc

	UseCanonicalName On

	# Set the environment
	SetEnv KOHANA_ENV development

</VirtualHost>
