TAG ?= $(shell git symbolic-ref --short -q HEAD | tr '/' '-' | tr '\' '-')-$(shell git describe --tags --long --always --abbrev=8 | tr '/' '-' | tr '\' '-')

BACKEND_IMAGE_NAME = replant-backend

FRONTEND_IMAGE_NAME = replant-frontend

.PHONY: help tag backend frontend up up-backend down reset logs test-backend admin

help:			## Display commands list with explanation
	@grep '^\w.*:\s' Makefile | sed -e s'/: down/: /' -e 's/## //'

tag:			## Display current Docker tag
	@echo $(TAG)

backend:		## Build backend Docker image
	docker build backend \
		--tag $(BACKEND_IMAGE_NAME)

frontend:		## Build frontend Docker image
	docker build frontend \
		--tag $(FRONTEND_IMAGE_NAME)

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

