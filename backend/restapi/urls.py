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
from .views import user_list_view, user_detail_view, user_self_view
from .fileservice import file_detail_view, file_list_view
from rest_framework_swagger.views import get_swagger_view
from rest_framework.renderers import JSONOpenAPIRenderer
from rest_framework import permissions

schema_view = get_swagger_view(title='Bootstrap API')

urlpatterns = [
    path('', get_schema_view(title='Bootstrap API', permission_classes=(permissions.AllowAny,))),
    path('swagger/', schema_view),
    
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('auth/token/obtain/', token_obtain_pair),
    path('auth/token/refresh/', token_refresh),
    path('auth/token/verify/', token_verify),
    
    path('users/', user_list_view, name='user-list'),
    path('user/', user_self_view, name='user-self'),
    path('user/<int:pk>/', user_detail_view, name='user-detail'),

    path('files/', file_list_view, name='file-list'),
    path('file/<str:filename>/', file_detail_view, name='file-detail'),

    path('admin/', admin.site.urls),
]
