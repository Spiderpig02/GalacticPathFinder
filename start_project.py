"""A setup script that starts the Django backend and React frontend in separate processes."""

import os
import subprocess
import sys
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("start_project.py")


def start_django() -> None:
    logger.info("Starting Django backend...")
    try:
        os.chdir('backend')
        subprocess.Popen([sys.executable, 'manage.py', 'runserver'])
    except FileNotFoundError:
        logger.error("Script manage.py not found. Are you sure you are in the root directory?")
        sys.exit(1)
    

def start_react() -> None:
    logger.info("Starting React frontend...")
    try:
        os.chdir('frontend')
        subprocess.Popen('npm install', shell=True)
        subprocess.Popen('npm run dev', shell=True)

    except FileNotFoundError:
        logger.error("Manifest package.json not found. Are you sure you are in the root directory?")
        sys.exit(1)

if __name__ == '__main__':
    start_django()
    start_react()
