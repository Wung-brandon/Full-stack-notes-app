from rest_framework import serializers
# from rest_framework_simplejwt.tokens import Token
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["email"] = user.email
        return token
        

class SignUpUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6, required=True, max_length=50, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ["username", "email", "password", "confirm_password"]
        
    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Password does not match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create(
            username = validated_data["username"],
            email = validated_data["email"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
        
class AllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")