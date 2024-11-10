from rest_framework import serializers
from .models import CustomUser, UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from django.contrib.auth import password_validation


class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)  
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'address', 'profile_image']  


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(required=False)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'user_profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('user_profile', None)

      
        user = CustomUser.objects.create_user(**validated_data)

        
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user


# Serializer for user login
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



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise ValidationError("New password and confirm password do not match.")

        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise ValidationError("Old password is incorrect.")

        password_validation.validate_password(data['new_password'], user)

        return data
