TAG ?= $(shell git symbolic-ref --short -q HEAD | tr '/' '-' | tr '\' '-')-$(shell git describe --tags --long --always --abbrev=8 | tr '/' '-' | tr '\' '-')

BACKEND_IMAGE_NAME = replant-backend

UPLOAD_APP_IMAGE_NAME = replant-upload-app

MARKETPLACE_APP_IMAGE_NAME = replant-marketplace-app

.PHONY: help tag backend upload-app marketplace-app up up-backend down reset logs test-backend admin lint-upload-app lint-marketplace-app

help:			## Display commands list with explanation
	@grep '^\w.*:\s' Makefile | sed -e s'/: down/: /' -e 's/## //'

tag:			## Display current Docker tag
	@echo $(TAG)

backend:		## Build backend Docker image
	docker build backend \
		--tag $(BACKEND_IMAGE_NAME)

upload-app:		## Build upload app Docker image
	docker build upload-app \
		--tag $(UPLOAD_APP_IMAGE_NAME)

marketplace-app:		## Build marketplace app Docker image
	docker build marketplace-app \
		--tag $(MARKETPLACE_APP_IMAGE_NAME)

up: down			## Run local service containers
	@[ -f backend/.env ] || touch backend/.env
	docker-compose --profile frontend up --build --remove-orphans

up-backend: down			## Run local service containers (only backend)
	@[ -f backend/.env ] || touch backend/.env
	docker-compose up --build --remove-orphans

down:			## Shut down service containers
	@[ -f backend/.env ] || touch backend/.env
	docker-compose down --remove-orphans

reset: down			## Reset local database
	rm -rf .postgres-data/

logs:			## Print logs (last 100 and follow) from containers
	docker-compose logs --tail 100 -f

test-backend:		## Run tests in backend container
	docker run $(BACKEND_IMAGE_NAME) /bin/sh -c './lint.sh -c && pytest'

admin:			## Create super user
	docker compose exec api python manage.py createsuperuser

lint-upload-app:		## Lint upload app in container
	docker run $(UPLOAD_APP_IMAGE_NAME) npm run lint

lint-marketplace-app:		## Lint marketplace app in container
	docker run $(MARKETPLACE_APP_IMAGE_NAME) npm run lint
