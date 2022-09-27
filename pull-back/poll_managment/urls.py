from .views import *
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.urls import path
#from auth.views import MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

#api_urlpatterns = [
#    path('accounts/', include('rest_registration.api.urls')),
#]


app_name = 'poll_managment'
urlpatterns = [
    path('poll', Poll_APIView.as_view()), 
    path('poll/<int:pk>/', Poll_APIView_Detail.as_view()),
    path('option', Option_APIView.as_view()), 
    path('option/<int:pk>/', Option_APIView_Detail.as_view()),   
    path('poll_result/<int:pk>',Pull_APIView_Result.as_view()),
    path('poll_mark/<int:pk>',Option_APIView_Mark.as_view()),
    path('poll/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('poll/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
    path('protected/', Protected.as_view(), name='protected'),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
   # path('register', include(api_urlpatterns)),
   # path('register/', RegisterAPI.as_view(), name='register'),
   
]