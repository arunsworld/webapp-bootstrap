"""restapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import path
from django.conf.urls import include
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh, token_verify
from .views import user_list_view, user_detail_view

urlpatterns = [
    path('', get_schema_view()),
    
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('auth/token/obtain/', token_obtain_pair),
    path('auth/token/refresh/', token_refresh),
    path('auth/token/verify/', token_verify),
    
    path('users/', user_list_view, name='user-list'),
    path('user/<int:pk>/', user_detail_view, name='user-detail'),

    path('admin/', admin.site.urls),
]
