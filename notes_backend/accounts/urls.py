from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("signup/", views.SignUpUserView.as_view(), name="signup"),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("users/", views.ListAllUsers.as_view(), name="users"),
    path('me/', views.UserDetailView.as_view(), name='user_detail'),
    
    
]
