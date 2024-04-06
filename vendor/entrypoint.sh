#!/bin/bash

CONFIG_FILE="/var/www/html/config.php"
UPLOADS_DIR="/var/www/html/uploads"
APACHE_CONF="/etc/apache2/apache2.conf"
SERVER_NAME="localhost"  # Change this to your desired server name

# Function to create a placeholder config.php file
create_config_file() {
  echo "<?php" > "$CONFIG_FILE"
  echo "// Your configuration settings here" >> "$CONFIG_FILE"
}

# Function to create the uploads directory
create_uploads_directory() {
  mkdir -p "$UPLOADS_DIR"
}

# Check if config.php exists, if not, create it
if [ ! -f "$CONFIG_FILE" ]; then
  create_config_file
fi

# Check if uploads directory exists, if not, create it
if [ ! -d "$UPLOADS_DIR" ]; then
  create_uploads_directory
fi

# Set permissions for Apache
chown -R www-data:www-data /var/www/html

# Set DirectoryIndex to admin.php
echo "DirectoryIndex admin.php" >> "$APACHE_CONF"

# Set ServerName
echo "ServerName $SERVER_NAME" > /etc/apache2/conf-available/servername.conf
a2enconf servername



# Run Apache in the foreground
apache2ctl -D FOREGROUND
