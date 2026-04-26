from rest_framework import serializers
from .models import CustomUser, UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from django.contrib.auth import password_validation
from old_book_sell.api_fields import StoredFileKeyField, StoredImageField


class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = StoredImageField(required=False, allow_null=True)
    profile_image_key = StoredFileKeyField(source='profile_image', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['phone_number', 'address', 'profile_image', 'profile_image_key']


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(read_only=True)
    phone_number = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    address = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    profile_image = StoredImageField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'password',
            'user_profile',
            'phone_number',
            'address',
            'profile_image',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        phone_number = validated_data.pop('phone_number', '')
        address = validated_data.pop('address', '')
        profile_image = validated_data.pop('profile_image', None)
        user = CustomUser.objects.create_user(**validated_data)

        UserProfile.objects.create(
            user=user,
            phone_number=phone_number,
            address=address,
            profile_image=profile_image,
        )

        return user


class EditUserProfileSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    address = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'address', 'profile_image']

    def update(self, instance, validated_data):
        phone_number = validated_data.pop('phone_number', None)
        address = validated_data.pop('address', None)
        profile_image = validated_data.pop('profile_image', None)

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile, _ = UserProfile.objects.get_or_create(user=instance)

        if phone_number is not None:
            profile.phone_number = phone_number

        if address is not None:
            profile.address = address

        if profile_image is not None:
            if profile.profile_image:
                profile.profile_image.delete(save=False)
            profile.profile_image = profile_image

        profile.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid login credentials")

        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user, context=self.context).data
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
            raise ValidationError({"old_password": "Old password is incorrect."})

        password_validation.validate_password(data['new_password'], user)
        return data
