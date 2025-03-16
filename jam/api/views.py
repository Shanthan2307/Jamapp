from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import Roomserializer
from .models import Room
# Create your views here.

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = Roomserializer
