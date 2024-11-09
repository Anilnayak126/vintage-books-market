from rest_framework import serializers
from .models import CustomUser, UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'address', 'profile_image']  # This will serialize user profile data


# Serializer for the CustomUser
class UserSerializer(serializers.ModelSerializer):
    
    user_profile = UserProfileSerializer()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'user_profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        
        profile_data = validated_data.pop('user_profile', None)

        
        user = CustomUser.objects.create_user(**validated_data)

        
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid login credentials")
        
        
        refresh = RefreshToken.for_user(user)

        
        user_data = UserSerializer(user).data  
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': user_data
        }
