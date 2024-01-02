"""
URL configuration for galacticPathFinder project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphtraversal/", include("graphtraversal.urls"), name="graphtraversal"),
    path(
        "openapi",
        get_schema_view(
            title="Galactic Path Finder Graph Traversal API",
            version="1.0.0",
            description="API for performing graph traversal operations.",
        ),
        name="openapi",
    ),
    path(
        "swagger-ui/",
        TemplateView.as_view(
            template_name="docs.html",
            extra_context={"schema_url": "openapi"},
        ),
    ),
]
