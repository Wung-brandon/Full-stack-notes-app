from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView, RetrieveAPIView
from .serializers import SignUpUserSerializer, MyTokenObtainPairSerializer, AllUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
# Create your views here.


# Class for creating a new account into the system
class SignUpUserView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SignUpUserSerializer
            
    
# Class to login a user with the email and password credentials and providing an access and refresh token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
  
# class to list all the users registered in the system but only the admin has the rights to see all the users as the permission class is set to IsAdminuser  
class ListAllUsers(ListAPIView):
    serializer_class = AllUserSerializer
    queryset = User.objects.all()
    permission_classes = (IsAdminUser,)
    

# class that uses the user access token to retrieve all the user information from the system
class UserDetailView(RetrieveAPIView):
    serializer_class = AllUserSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        return self.request.user