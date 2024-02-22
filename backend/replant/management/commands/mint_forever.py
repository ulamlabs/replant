import logging
from pathlib import Path
from time import sleep

from django.core.management.base import BaseCommand

import env


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        logger = logging.getLogger(__name__)

        while True:
            logger.info("Minting NFT's...")

            Path(env.MINT_FOREVER_HEALTHCHECK_FILE_PATH).touch()
            sleep(env.MINT_FOREVER_SLEEP_TIME_SECONDS)
