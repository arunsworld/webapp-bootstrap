docker run --rm -i -d --name bootstrap -v "$PWD/../":/app --network apps-net arunsworld/django-apache:Anaconda3-5.2.0
docker cp 000-default.conf bootstrap:/etc/apache2/sites-available/
docker cp .htaccess bootstrap:/app/frontend/dist/ab-bootstrap/
docker exec bootstrap apachectl restart
