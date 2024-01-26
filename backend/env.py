import os
from typing import Final

DATABASE_URL: Final[str] = os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
ENV: Final[str] = os.getenv("ENV", "local")
SECRET_KEY: Final[str] = os.getenv(
    "SECRET_KEY", "django-insecure-e@r8+=9i1et%kta%81(6#=&=-ls#$7d0kqzxw6ihpipxnd414k"
)
DEBUG: Final[bool] = os.getenv("DEBUG", "false") == "true"

KUBERNETES_SERVICE_HOST: Final[str] = os.getenv("KUBERNETES_SERVICE_HOST", "")
NO_COLOR: Final[bool] = os.getenv("NO_COLOR", "false") == "true"
