"""
Django settings for replant project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

import dj_database_url

import env

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.SECRET_KEY

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.DEBUG

ALLOWED_HOSTS = ["*"]

if env.ENV == "local":
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ]
else:
    CORS_ALLOWED_ORIGINS = [env.UPLOAD_APP_URL, env.MARKETPLACE_APP_URL]

CSRF_TRUSTED_ORIGINS = [*CORS_ALLOWED_ORIGINS]

CORS_ALLOW_CREDENTIALS = True

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party apps
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "debug_toolbar",
    "phonenumber_field",
    "django_filters",
    "admin_auto_filters",
    # Project apps
    "replant",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    # This should be above White Noise
    # https://pypi.org/project/django-cors-headers/#setup
    "corsheaders.middleware.CorsMiddleware",
    # This should be as early as possible, but below Security
    # http://whitenoise.evans.io/en/stable/django.html#enable-whitenoise
    "whitenoise.middleware.WhiteNoiseMiddleware",
    # This should be as early as possible
    # https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#add-the-middleware
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "replant.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": ["replant/templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "replant.wsgi.application"

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {"default": dj_database_url.config(default=env.DATABASE_URL)}

# Custom user model
AUTH_USER_MODEL = "replant.User"

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
        "OPTIONS": {
            "user_attributes": ("username",),
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "replant.auth.SpecialCharacterValidator",
    },
    {
        "NAME": "replant.auth.DigitValidator",
    },
    {
        "NAME": "replant.auth.UppercaseValidator",
    },
    {
        "NAME": "replant.auth.LowercaseValidator",
    },
]

# Rest framework + drf spectacular + debug toolbar

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "replant.auth.SessionAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "replant.pagination.PageNumberPagination",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Replant API",
    "DESCRIPTION": "Replant API documentation",
    "VERSION": "0.1.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "SERVE_PERMISSIONS": [
        "rest_framework.permissions.IsAdminUser",
    ],
}

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda debug: DEBUG,
    "RESULTS_CACHE_SIZE": 100,
    "RENDER_PANELS": True,
}

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "/django-static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "/django-files/"
MEDIA_ROOT = BASE_DIR / "media"

if env.ENV != "local":
    AWS_ACCESS_KEY_ID = env.AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY = env.AWS_SECRET_ACCESS_KEY
    AWS_STORAGE_BUCKET_NAME = env.AWS_STORAGE_BUCKET_NAME
    AWS_S3_ENDPOINT_URL = env.AWS_S3_ENDPOINT_URL
    AWS_S3_CUSTOM_DOMAIN = env.AWS_S3_CUSTOM_DOMAIN
    AWS_DEFAULT_ACL = "public-read"
    AWS_QUERYSTRING_AUTH = False

    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3.S3Storage",
        },
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
        },
    }


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": "{levelname} [{asctime}] {name}: {message}",
            "datefmt": "%Y-%m-%d %H:%M:%S",
            "style": "{",
        },
        "json": {
            "()": "pythonjsonlogger.jsonlogger.JsonFormatter",
            "format": "%(levelname)s %(asctime)s %(name)s %(message)s",
            "rename_fields": {
                "levelname": "level",
                "asctime": "date",
                "name": "component",
            },
        },
        "colored": {
            "()": "colorlog.ColoredFormatter",
            "format": "{log_color}[{asctime}] {name}: {message}",
            "datefmt": "%Y-%m-%d %H:%M:%S",
            "style": "{",
            "log_colors": {
                "WARNING": "yellow",
                "ERROR": "bold_red",
                "CRITICAL": "bold_white,bg_red",
            },
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": (
                "json"
                if env.KUBERNETES_SERVICE_HOST
                else "simple"
                if env.NO_COLOR
                else "colored"
            ),
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO" if DEBUG else "WARNING",
            "propagate": False,
        },
    },
}
