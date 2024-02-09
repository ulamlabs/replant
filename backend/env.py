import os
from typing import Final

DATABASE_URL: Final[str] = os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
UPLOAD_APP_URL: Final[str] = os.getenv("UPLOAD_APP_URL", "http://localhost:5173")
ENV: Final[str] = os.getenv("ENV", "local")
SECRET_KEY: Final[str] = os.getenv(
    "SECRET_KEY", "django-insecure-e@r8+=9i1et%kta%81(6#=&=-ls#$7d0kqzxw6ihpipxnd414k"
)
DEBUG: Final[bool] = os.getenv("DEBUG", "false") == "true"

KUBERNETES_SERVICE_HOST: Final[str] = os.getenv("KUBERNETES_SERVICE_HOST", "")
NO_COLOR: Final[bool] = os.getenv("NO_COLOR", "false") == "true"

PASSCODE_VALID_DAYS: Final[int] = int(os.getenv("PASSCODE_VALID_DAYS", "7"))

# SEI configuration (testnet defaults)
SEI_CHAIN_ID: Final[str] = os.getenv("SEI_CHAIN_ID", "atlantic-2")
SEI_RPC: Final[str] = os.getenv("SEI_RPC", "rest+https://rest.atlantic-2.seinetwork.io")
SEI_ADMIN_MNEMONIC: Final[str] = os.getenv(
    "SEI_ADMIN_MNEMONIC",
    "erode between wonder swim stay hidden option web rare acid stable matter tag mix skill marine inside spring pipe scare advice liquid shallow huge",
)
SEI_NFT_ADDRESS: Final[str] = os.getenv(
    "SEI_NFT_ADDRESS", "sei13hxtue98v4vzs25r8j5l0n3wukj6h05k73syguy8gs49jexhx2hqxslrx6"
)
