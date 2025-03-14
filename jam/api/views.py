from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import Roomserializer
import .models from Room
# Create your views here.

class RoomView(generics.CreateAPIView):
    queryset = Room.ojects.all()
    serializer_class = Roomserializer
