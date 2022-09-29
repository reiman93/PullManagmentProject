from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PollSerializers, OptionSerializers, RegisterSerializer
from .models import Poll, Option
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from django.http import Http404
from django.http import JsonResponse
from django.views import View
from django.core import serializers
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from rest_framework import generics

from rest_framework import generics, permissions


from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import HttpResponse
import json


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class MyObtainTokenPairView(TokenObtainPairView):
  #  permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class Poll_APIView(APIView):    
 #   permission_classes = [IsAuthenticated]
    def get(self, request, format=None, *args, **kwargs):
        poll = Poll.objects.all()
        serializer = PollSerializers(poll, many=True)

        
        return Response(serializer.data)    
    
    def post(self, request, format=None):
        user_id=User.objects.filter(username=request.data["user_id"])
        request.data["user_id"]=user_id
        request.data["total_participants"]=0
       # serializer = PollSerializers(data=request.data)
        
       # poll = Poll(question=request.data["question"], cant_options=request.data["cant_options"], total_participants=0, user_id=request.data["user_id"])
       # poll.save()

        if serializer.is_valid():
            polls=Poll.objects.get(id=request.data["id"])
            polls.total_participants=polls.total_participants+1
            polls.save()
        #    id = Poll.objects.filtrer() 
            cant=request.data['cant_options']
            list=request.data['options']
        
            for opt in list:
                options= Option(name=opt, poll=request.data["id"], cant_marks=0 )    
                options.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class Poll_APIView_Detail(APIView):    
    
    
    def get_object(self, pk):
        try:
            return Poll.objects.get(pk=pk)
        except Poll.DoesNotExist:
            raise Http404  


    def get(self, request, pk, format=None):
        poll = self.get_object(pk)
        serializer = PollSerializers(poll)  
        return Response(serializer.data)    
  

    
    def put(self, request, pk, format=None):
        user_id=User.objects.get(username=request.data["user_id"])
        request.data["user_id"]=user_id
        request.data["total_participants"]=0
        serializer = PollSerializers(data=request.data)
        

        if serializer.is_valid():
            poll=Poll.objects.get(id=request.data["id"])
            poll.total_participants=poll.total_participants+1
            poll.save()

           # id = Poll.objects.filter() 
            cant=request.data['cant_options']
            list=request.data['options']
            options=Option.objects.filter(poll=pk)
            options.delete()
           # options.save()
        
            for opt in list:
                options= Option(name=opt, poll=poll, cant_marks=0)    
                options.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,pk, format=None):
        poll = self.get_object(pk)
        poll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Option_APIView(APIView):
    
    def get(self, request, format=None, *args, **kwargs):
        option = Option.objects.all()
        serializer = OptionSerializers(option, many=True)
        
        return Response(serializer.data)    
    

    def post(self, request, format=None):
        serializer = OptionSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class Option_APIView_Detail(APIView): 

    def get_object(self, pk):
        try:
            return Option.objects.get(pk=pk)
        except Option.DoesNotExist:
            raise Http404  

    def get(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = OptionSerializers(option)  
        return Response(serializer.data)    


    def put(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = OptionSerializers(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

 #   @api_view(["POST"])
 #   @permission_classes([permissions.IsAuthenticated])    
    def delete(self, request, format=None):
        option = self.get_object(pk)
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Pull_APIView_Result(APIView):
    def get(self, request,pk, format=None):
        
        #id = request.data["id"]
        total=Poll.objects.get(id=pk).total_participants
        
        parts = Option.objects.all().filter(poll=pk)
        porcents=[]

        for part in parts:
            porcents.append( (part.cant_marks*100)/total )

        return JsonResponse(list(porcents), safe=False)

class Option_APIView_Mark(APIView):
 #   permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        poll=Poll.objects.get(id=request.data["id"])
        poll.total_participants=poll.total_participants+1
        poll.save()

        option1 = Option.objects.get(id=request.data["id_option"])
        option1.cant_marks=option1.cant_marks+1
        option1.save()
        return HttpResponse("Success")
        


class Protected(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"content": "This view are protected"})

class GetOptions(APIView):
    def get(self, request,pk, format=None):
        #id=request.data["id"]
        options = Option.objects.filter(poll = pk)
        #options = serializers.serialize("json",  Option.objects.filter(poll = pk))
        return JsonResponse(list(options.values()), safe=False)
