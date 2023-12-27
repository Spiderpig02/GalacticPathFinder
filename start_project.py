import os
import subprocess
import sys


def start_django() -> None:
    print("Starting Django backend...")
    os.chdir('backend')
    subprocess.Popen([sys.executable, 'manage.py', 'runserver'])

def start_react() -> None:
    print("Starting React frontend...")
    os.chdir('frontend')
    if os.name == 'nt':  # If the OS is Windows
        subprocess.Popen('start npm start', shell=True)
    else:
        subprocess.Popen('npm start', shell=True)

if __name__ == '__main__':
    start_django()
    start_react()
