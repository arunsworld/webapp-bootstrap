A bootstrap package to get started with building WebApps.

* frontend - has code for Angular based apps
* backend - has code for Django based REST webservices

## Dependencies

* arunsworld/angular:latest Docker image
* arunsworld/django-apache:Anaconda3-5.2.0 Docker image (`docker pull arunsworld/django-apache:Anaconda3-5.2.0`)

## How to use

* Download from git
* Install npm packages
``
cd frontend
npm install
``
* Perform Angular build to create the frontend binary
``
ng build --prod
``
* Start apache and start serving content
``
cd scripts
./start_container.sh
``
* Navigate to: http://localhost:8090/demo/

## How to customize

* Modify package name in frontend/package.json. Change ab-bootstrap.
* Modify project name in frontend/angular.json. Change ab-bootstrap.
* Modify app title in frontend/src/index.html.
* Modify scripts/000-default.conf to change the folder name from ab-bootstrap to your project name.
