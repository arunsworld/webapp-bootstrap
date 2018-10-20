docker run --rm -i -d --name bootstrap -p 8090:80 -v "$PWD/../":/app -p 8091:8000 arunsworld/django-apache:Anaconda3-5.3.0
docker cp 000-default.conf bootstrap:/etc/apache2/sites-available/
docker cp .htaccess bootstrap:/app/frontend/dist/ab-bootstrap/
docker exec bootstrap apachectl restart
