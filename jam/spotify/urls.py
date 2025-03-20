from django.contrib import admin
from django.urls import path,include
from .views import *
from django.urls import re_path


urlpatterns = [
    path('get-auth-url',AuthURL.as_view())
]