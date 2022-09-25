from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PollSerializers, OptionSerializers
from .models import Poll, Option
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from django.http import Http404
from django.http import JsonResponse
from django.views import View

from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class Poll_APIView(APIView):    
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None, *args, **kwargs):
        poll = Poll.objects.all()
        serializer = PollSerializers(poll, many=True)
        
        return Response(serializer.data)    
    
  #  @api_view(["POST"])
  #  @permission_classes([permissions.IsAuthenticated])
    def post(self, request, format=None):
        serializer = PollSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
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

    @api_view(["POST"])
    @permission_classes([permissions.IsAuthenticated])
    
    def put(self, request, pk, format=None):
        poll = self.get_object(pk)
        serializer = PollSerializers(poll, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

    @api_view(["POST"])
    @permission_classes([permissions.IsAuthenticated])
    def delete(self, request, pk, format=None):
        poll = self.get_object(pk)
        poll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Option_APIView(APIView):
#    @api_view(["POST"])
#    @permission_classes([permissions.IsAuthenticated])    
    def get(self, request, format=None, *args, **kwargs):
        option = Option.objects.all()
        serializer = OptionSerializers(option, many=True)
        
        return Response(serializer.data)    
    
#    @api_view(["POST"])
#    @permission_classes([permissions.IsAuthenticated])
    def post(self, request, format=None):
        serializer = OptionSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class Option_APIView_Detail(APIView): 
  #  @api_view(["POST"])
  #  @permission_classes([permissions.IsAuthenticated])   
    def get_object(self, pk):
        try:
            return Option.objects.get(pk=pk)
        except Option.DoesNotExist:
            raise Http404  

   # @api_view(["POST"])
   # @permission_classes([permissions.IsAuthenticated])
    def get(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = OptionSerializers(option)  
        return Response(serializer.data)    

  #  @api_view(["POST"])
  #  @permission_classes([permissions.IsAuthenticated])
    def put(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = OptionSerializers(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

 #   @api_view(["POST"])
 #   @permission_classes([permissions.IsAuthenticated])    
    def delete(self, request, pk, format=None):
        option = self.get_object(pk)
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Pull_APIView_Result(APIView):
    def post(self, request, pk, format=None):
        total=Poll.objects.get(id=pk).total_participants
        
        parts = Option.objects.all().filter(poll=pk)
        porcents=[]

        for part in parts:
            porcents.append( (part.cant_marks*100)+total )

        return JsonResponse(list(porcents), safe=False)

class Option_APIView_Mark(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        option1=Option()
        option1 = Option.objects.get(id=pk)
        marks=Option.objects.get(id=pk).cant_marks
        marks=marks+1
        #request.data["cant_marks"]=marks
        serializer = OptionSerializers(option1, data=request.data)
        print("noooooooo")
        if serializer.is_valid():
          #  print("siiiiiiiiiiii")
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class Protected(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"content": "This view are protected"})