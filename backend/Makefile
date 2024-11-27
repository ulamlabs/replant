format_all:
	poetry run black .
	poetry run isort .
	poetry run flake8 .
	poetry run mypy .

test:
	poetry run pytest -m "not live_request"
