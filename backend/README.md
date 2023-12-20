# Backend

How to generate project:

```bash
django-admin startproject backend
cd backend
```

## How to run the server

```bash
python manage.py runserver
```

## How to create a new application in the backend

To create a new application This command creates a new directory named "graphtraversal" within your "backend" directory, along with the basic files needed for a Django app.

```bash
python manage.py startapp graphtraversal
```

Register the New App: To include your new app in your project, you need to add it to the INSTALLED_APPS list in your project's settings file (settings.py). Open the settings.py file and add the name of your app to the list:

```py
INSTALLED_APPS = [
    # other apps
    'graphtraversal',
]
```

Develop Your App: Now that your app is set up, you can start building its models, views, templates, URLs, etc
