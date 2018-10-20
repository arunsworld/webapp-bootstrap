A bootstrap package to get started with building WebApps.

* frontend - has code for Angular based apps
* backend - has code for Django based REST webservices

## Dependencies

* arunsworld/angular:latest Docker image (optional)
* arunsworld/django-apache:Anaconda3-5.3.0 Docker image (`docker pull arunsworld/django-apache:Anaconda3-5.3.0`)

## How to use

* Download from git (git clone https://github.com/arunsworld/webapp-bootstrap.git)
* Install npm packages (optional)
```
docker run --rm -it -v $PWD:/app arunsworld/angular:latest

cd /app/frontend
npm install
```

* Perform Angular build to create the frontend binary (optional)
```
ng build --prod
```
* Create backend DB
```
docker run --rm -i -d -v $PWD:/app --name backend arunsworld/django-apache:Anaconda3-5.3.0
docker exec -it backend bash

cd /app/backend
python manage.py migrate; python manage.py createsuperuser; python manage.py collectstatic;

stop
```
* Start apache and start serving content
```
cd scripts
./start_container.sh
```
* Navigate to: http://localhost:8090/demo/

## How to customize

* Modify package name in frontend/package.json. Change ab-bootstrap.
* Modify project name in frontend/angular.json. Change ab-bootstrap.
* Modify app title in frontend/src/index.html.
* Modify scripts/000-default.conf to change the folder name from ab-bootstrap to your project name.

## Testing the API

* Navigate to http://localhost:8090/api/
* Login with credentials to see the API schema
* Navigate to http://localhost:8090/api/auth/token/obtain/ and obtain an Access token
* Test the echo service using the access token:
`curl --request POST --header "Authorization: Bearer __access_token__" --header "Content-type: application/json" --data '{"message":"Hello"}' http://localhost:8090/api/echo/`
* More JWT library settings: https://getblimp.github.io/django-rest-framework-jwt/#additional-settings

## Extending the REST API

* Update urls.py to include url patterns and refer to APIViews
* Refer: http://www.django-rest-framework.org/tutorial/3-class-based-views/
* Refer: http://www.django-rest-framework.org/api-guide/status-codes/
