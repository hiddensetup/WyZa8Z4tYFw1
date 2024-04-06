# Start from a base image
FROM ubuntu:20.04

# Disable prompts during package installation
ARG DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && \
    apt-get install -y -qq \
        apache2 \
        libapache2-mod-php \
        php7.4 \
        php7.4-gd \
        php7.4-mysql \
        php7.4-mbstring \
        php7.4-xml \
        php7.4-zip \
        nano \
        unzip \
        mysql-client \   
        && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

# Enable Apache modules
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html/

# Copy website files to Apache document root
COPY . .

# Copy the entrypoint script to the container
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy your .htaccess file
COPY .htaccess /var/www/html/

# Configure MySQL to use UTF-8
RUN echo "[mysqld]" >> /etc/mysql/my.cnf && \
    echo "character-set-server=utf8mb4" >> /etc/mysql/my.cnf

# Expose Apache port
EXPOSE 80

# Specify the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]